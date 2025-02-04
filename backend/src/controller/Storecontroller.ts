
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
import isStoreAuthenticated from "../middleware/storeauth.js";
import Store, {IStore} from "../models/Store.js"
import {z} from 'zod'
import e from "express";
import sendStoreToken from "../utils/jwtStoreToken.js";


const storeRouter = express.Router();

// using interface to be able to tell typescript what type of data the Store object will contain

interface StorePayload {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    phoneNumber: string;
    address: string;

}

// Validation Schema using Zod
const StoreSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
    phoneNumber: z.string().regex( /^(?:\+234|0)[789][01]\d{8}$/, "Invalid Nigerian phone number. Use +234XXXXXXXXXX or 080XXXXXXXX"),
    address: z.string().min(10, "Address must be at least 10 characters"),
  });

const deleteFile = (filepath: string, next: NextFunction) => {
    fs.unlink(filepath, (err) => {
        if(err) {
            console.error("file deletion error:", err);
            return next(createDataBaseError("Error deleting file"))
        }
    })
}

// STORES SIGN UP

storeRouter.post('/create-store', upload.single("file"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, name, password, address, number} = req.body;
        const validationResult = StoreSchema.safeParse({name, email, password, phoneNumber: number, address});
        if(!validationResult.success) {
            if(req.file) deleteFile(req.file.path, next);
            return next(createvalidateError(validationResult.error.message));
        }

        // Check if store already exists
        const existingStore = await Store.findOne({ email });
        if (existingStore) {
        if (req.file) deleteFile(req.file.path, next);
        return next(createvalidateError("Store already exists with this email"));
        }

        const fileName = req.file?.filename
        const fileUrl = path.join(fileName ? `/images/${fileName}` : "..images/default.jpg"); // Use absolute path

        //create activation token (UUID)
        //const activationId = uuidv4();
        // hashed password cause its not yet hashed
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const store : StorePayload = {
            name,
            email,
            password: hashedPassword,
            avatar: fileUrl,
            phoneNumber: number,
            address
        }

        const activationToken = createActivationToken(store)

        const activationURL = `${process.env.FRONTEND_URL}/store-verify-email/${activationToken}`;

        const emailBody = `
        <p>Hello ${name},</p>
        <p>Please click on the following link to activate your store account:</p>
        <a href="${activationURL}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">→ Click Here ←</a>
        <p>Thank you!</p> `;
        // AFTER SUCCESSFULLY VERIFICATION I GO CON SEND A WELCOME EMAIL TO THEM AND OUR TERMS AND SERVICES DOCS THINGS LIKE THAT

        try {
            await sendMail({
                email:email,
                subject: "Activate your store account",
                html: emailBody,
            })
            res.status(200).json({
                success: true,
                message: `Check your email (${email}) for the activation link.`   
            })
        } catch (error) {
            return next(createDataBaseError("Error sending activation email"))   
        }
        

    } catch (error) {
        if(error instanceof Error){
            //console.error("Error creating store:", error);
            return next(createDataBaseError(error.message))
        }
        return next(createDataBaseError("An unknown Error occurred"))
        
    }
} )

const createActivationToken = (storeData : StorePayload): string => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error("Missing JWT_SECRET environment variable");
    }
    return jwt.sign(storeData, secret, {expiresIn: "30m"}  )
}

storeRouter.post('/verify-email', catchAsync(async(req: Request, res:Response, next: NextFunction) => {
    try {
        
        const {activation_token} = req.body;

        const decoded = jwt.verify(activation_token, process.env.JWT_SECRET as string);
        if(!decoded){
            return next(createvalidateError("Invalid or expired activation link"));
        }
        //take the details from the decoded token
        const {name, email, password, phoneNumber, address, avatar} = decoded as StorePayload

        //check if store already exists (double-check)
        const existingStore = await Store.findOne({email});
        if (existingStore)  {
            return next(createvalidateError("Store already exists with this email"));
        }

        const store = await Store.create({
            name,
            email,
            address,
            phoneNumber,
            password,
            avatar   
        })

        //will not use the sendToken cookie function cause that one will be for user
        //instead we will create a new sendStoreToken which will be for seller to clearly define their seperate role
        // for user who might be both seller and buyer/user thru the token it can be able to tell their difference 
        sendStoreToken(store, 201, res)

    } catch (error) {

        console.log(error)
        return next(createDataBaseError("An error occurred while verifying the email"));
    }
})

)

// stores log in router
storeRouter.post('/login-store', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createvalidateError("Please provide both email and password"));
        }

        // Check if the user exists
        const logStore = await Store.findOne({ email }).select('+password'); // Include the password in the query result

        if (!logStore) {
            return next(createvalidateError("Store not found"));
        }

        const isMatch = await logStore.comparePassword(password); 
        if (!isMatch) {
            return next(createvalidateError("Invalid credentials"));
        }
 
         // Generate token for the user and send it to the frontend
        sendStoreToken(logStore, 201, res);
    } catch (error) {
        return next(createDataBaseError("An error occurred while logging in"));
    }
}));

storeRouter.get('/getseller', isStoreAuthenticated, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.store) {
        return next(createDataBaseError("Seller/store not authenticated"));
    }
    
    try {
        const store = await Store.findById((req.store as IStore)._id.toString());//req.user.id user from the login cookies in the fronted // Ensure req.user is properly typed
        if (!store) {
            return next(createDataBaseError("Seller/store not found"));
        }
        res.status(200).json({
            success: true,
            store,
        });
    } catch (error) {
        return next(createDataBaseError("An error occurred while fetching store data"));
    }
})
)

export default storeRouter 