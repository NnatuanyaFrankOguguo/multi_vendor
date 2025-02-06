import User, {IUser} from "../models/Users.js";
import express, { Request, Response, NextFunction } from "express";
import { createvalidateError, createDataBaseError } from "../utils/ErrorHandler.js";
import bcrypt from 'bcrypt';
import path from "path";
import {upload} from "../multer.js"
import fs from 'fs'
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { catchAsync } from "../middleware/catchAsync.js";
import sendToken from "../utils/jwtToken.js";
import isAuthenticated from "../middleware/auth.js";


const userRouter = express.Router();
//using interface to be able to tell typescript what kind of types the object contains
interface UserPayload {
    fname: string; // Define your user object structure here
    lname: string; // 
    email: string; //    
    password?: string; //
    avatar?: string; //
    googleId?: string; //

}

const deleteFile = (filepath: string, next: NextFunction) => {
    fs.unlink(filepath, (err) => {
        if(err) {
            console.error("file deletion error:", err);
            return next(createDataBaseError("Error deleting file"));
        }
    })
}


// USERS SIGN UP
userRouter.post('/create-user', upload.single("file"), async (req : Request, res : Response, next: NextFunction) => {
    try {
        const { fname, lname,  email, password } = req.body;
        // const avatar = req.file? req.file.path : path.join(__dirname, '../public/uploads/default.jpg');
        const existingUser = await User.findOne({email})
        if(existingUser)
        {
            if(req.file){
                const filename = req.file?.filename;
                const filepath = `uploads/${filename}`;
                deleteFile(filepath, next) //Clean up uploaded file if user exists
            }
            //DO RES.STATUS. (SEND USER ALREADY EXIST TO THE FRONTEND AND USE POP UP TO DISPLAY IT FOR THEM)
            return next(createvalidateError("User already exists"))
        }

        const fileName = req.file?.filename 
        const fileUrl = path.join(fileName ? `/images/${fileName}` : "/images/default.jgp" ); //use an absolute path
        const user : UserPayload = {
            fname : fname,
            lname : lname,
            email : email,
            password : password,
            avatar : fileUrl,
                // Set a default value if `public_id` is required but not provided
        }
        //to create token for our user
        const activationToken = createActivationToken(user);

        //activationURL for verification of email
        const activationURL = `${process.env.FRONTEND_URL}/verify-email/${activationToken}`;

        const emailBody = `
        <p>Hello ${user.fname},</p>
        <p>Please click on the following link to activate your account:</p>
        <a href="${activationURL}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">→ Click Here ←</a>
        <p>Thank you!</p>
        `;


        try {
            const sendingEmail = await sendMail({
                email: user.email,
                subject: "Activate your account",
                html: emailBody,
            })
            res.status(200).json({
                success: true,
                message: ` Check your email:- ${user.email} for user activation link.`,
               // data: sendingEmail, // You can also send the activation link in the response data for immediate use
            })
            
        } catch (error) {
            return next(createDataBaseError("Error sending activation email"));

        }


        // const newUser = await User.create(user);
        // res.status(201).json({
        //     message: "User created successfully",
        //     user: newUser
        // })
    } catch (error) {
         // Use the appropriate error handler
      if (error instanceof Error) {
        return next(createDataBaseError(error.message)); // Handle unexpected DB errors
      }
      return next(createDataBaseError("An unknown error occurred"));
    }
})

//create activation token use it here and export it again to passport.ts
export const createActivationToken = (user : UserPayload) : string => {
    // const {fname, lname, email } = user; // Avoid sensitive data like password
    const payload = user // Only include essential fields
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing JWT_SECRET environment variable");
    }
    return jwt.sign(payload, secret, {expiresIn: "5m"})
}

//activate user by   I REMOVED THE /:TOKEN from the api 

userRouter.post('/verify-email', catchAsync(async(req : Request, res : Response, next: NextFunction) => {
   try {
        const { activation_token } = req.body;
        const decoded = jwt.verify(activation_token, process.env.JWT_SECRET as string);
        if(!decoded) {
            return next(createvalidateError("Invalid or expired token"));
        }
        //take the details from the decoded token
        const {fname, lname, email, avatar, password, googleId} = decoded as UserPayload
        
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createvalidateError("User already exists"));
        }

        // Hash the password before saving to the database
         // Check if the password is already hashed
        //  const isPasswordHashed = password?.startsWith('$2b$');
        //  const finalPassword = isPasswordHashed
        //      ? password // Use the hashed password as-is
        //      : await bcrypt.hash(password as string, 10); // Hash if not already hashed

        const newUser = await User.create({
          fname,
          lname,
          email,
          password,
          avatar,
          googleId
        })
        //this is where we create token for the new user send it to the frontend and saved as cookie in utils => jwtToken
        sendToken(newUser, 201, res)

   } catch (error) {
        console.log(error)
        return next(createDataBaseError("An error occurred while verifying the email"));
   } 
    

}));

// USERS LOGIN
userRouter.post('/login-user', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const logUser = await User.findOne({ email }).select('+password'); // Include the password in the query result

        if (!logUser) {
            return next(createvalidateError("User not found"));
        }

        // If the user exists but has a Google account
        // if (logUser.googleId) {
        //     return next(createvalidateError("This account is linked to Google. Please log in with Google."));
        // }
 
        // Check if the password is correct using the comparePassword method
        const isMatch = await logUser.comparePassword(password); 
        if (!isMatch) {
            return next(createvalidateError("Invalid credentials"));
        }
 
         // Generate token for the user and send it to the frontend
        sendToken(logUser, 201, res);
    } catch (error) {
        return next(createDataBaseError("An error occurred while logging in"));
    }
}));

// load User
userRouter.get('/getuser', isAuthenticated, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(createDataBaseError("User not authenticated"));
    }
    
    try {
        const user = await User.findById((req.user as IUser)._id.toString());//req.user.id user from the login cookies in the fronted // Ensure req.user is properly typed
        if (!user) {
            return next(createDataBaseError("User not found"));
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(createDataBaseError("An error occurred while fetching user data"));
    }
})
)

// LOGOUT USER
userRouter.get('/logout', isAuthenticated, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie('us_tk', null, {
            expires: new Date(0), // Expire the cookie
            httpOnly: true,
            sameSite: 'none', // Required for cross-site cookies
            secure: true, // Required if using HTTPS
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return next(createDataBaseError("An error occurred while logging out"));
    }
}));


export default userRouter;




