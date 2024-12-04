import User from "../models/Users.js";
import express from "express";
import { createvalidateError, createDataBaseError } from "../utils/ErrorHandler.js";
import bcrypt from 'bcrypt';
import path from "path";
import { upload } from "../multer.js";
import fs from 'fs';
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { catchAsync } from "../middleware/catchAsync.js";
import sendToken from "../utils/jwtToken.js";
const userRouter = express.Router();
const deleteFile = (filepath, next) => {
    fs.unlink(filepath, (err) => {
        if (err) {
            console.error("file deletion error:", err);
            return next(createDataBaseError("Error deleting file"));
        }
    });
};
userRouter.post('/create-user', upload.single("file"), async (req, res, next) => {
    try {
        const { fname, lname, email, password } = req.body;
        // const avatar = req.file? req.file.path : path.join(__dirname, '../public/uploads/default.jpg');
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (req.file) {
                const filename = req.file?.filename;
                const filepath = `uploads/${filename}`;
                deleteFile(filepath, next); //Clean up uploaded file if user exists
            }
            return next(createvalidateError("User already exists"));
        }
        const fileName = req.file?.filename;
        const fileUrl = path.join(fileName || '..uploads/default.jpg'); //incase filename name doesnt exists there or string filepath is there
        const user = {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            avatar: fileUrl,
            // Set a default value if `public_id` is required but not provided
        };
        //to create token for our user
        const activationToken = createActivationToken(user);
        //activationURL for verification of email
        const activationURL = `http://localhost:5173/verify-email/${activationToken}`;
        try {
            const sendingEmail = await sendMail({
                email: user.email,
                subject: "Activate your account",
                text: `Hello ${user.fname}, \nPlease click on the following link to activate your account: ${activationURL}`,
            });
            res.status(200).json({
                success: true,
                message: `User created successfully. Check your email:- ${user.email} for activation link.`,
                data: sendingEmail, // You can also send the activation link in the response data for immediate use
            });
        }
        catch (error) {
            return next(createDataBaseError("Error sending activation email"));
        }
        // const newUser = await User.create(user);
        // res.status(201).json({
        //     message: "User created successfully",
        //     user: newUser
        // })
    }
    catch (error) {
        // Use the appropriate error handler
        if (error instanceof Error) {
            return next(createDataBaseError(error.message)); // Handle unexpected DB errors
        }
        return next(createDataBaseError("An unknown error occurred"));
    }
});
//create activation token use it here and export it again to passport.ts
export const createActivationToken = (user) => {
    // const {fname, lname, email } = user; // Avoid sensitive data like password
    const payload = user; // Only include essential fields
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing JWT_SECRET environment variable");
    }
    return jwt.sign(payload, secret, { expiresIn: "5m" });
};
//activate user by 
userRouter.post('/verify-email/:token', catchAsync(async (req, res, next) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(createvalidateError("Invalid or expired token"));
        }
        //take the details from the decoded token
        const { fname, lname, email, avatar, password } = decoded;
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createvalidateError("User already exists"));
        }
        // Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = User.create({
            fname,
            lname,
            email,
            password: hashedPassword,
            avatar
        });
        sendToken(newUser, 201, res);
    }
    catch (error) {
        return next(createDataBaseError("An error occurred while verifying the email"));
    }
}));
export default userRouter;
