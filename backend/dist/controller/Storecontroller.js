import express from "express";
import { createvalidateError, createDataBaseError } from "../utils/ErrorHandler.js";
import path from "path";
import { upload } from "../multer.js";
import fs from 'fs';
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import { catchAsync } from "../middleware/catchAsync.js";
import sendToken from "../utils/jwtToken.js";
import Store from "../models/Store.js";
const storeRouter = express.Router();
const deleteFile = (filepath, next) => {
    fs.unlink(filepath, (err) => {
        if (err) {
            console.error("file deletion error:", err);
            return next(createDataBaseError("Error deleting file"));
        }
    });
};
// STORES SIGN UP
storeRouter.post('/create-store', upload.single("file"), async (req, res, next) => {
    try {
        const { email, name, password, address, number } = req.body;
        const existingStore = await Store.findOne({ email });
        if (existingStore) {
            if (req.file) {
                const filename = req.file?.filename;
                const filepath = `uploads/${filename}`;
                deleteFile(filepath, next);
            }
            return next(createvalidateError("Store already exists with this email"));
        }
        const fileName = req.file?.filename;
        const fileUrl = path.join(fileName || "..uploads/default.jpg"); //incase filename name doesnt exists there or string filepath is there
        const store = {
            name,
            email,
            address,
            password,
            phoneNumber: number,
            avatar: fileUrl,
        };
        //to create token for our user
        const activateToken = createActivationToken(store);
        //activationURL for verification of email
        const activationURL = `http://localhost:5173/seller/verify-email/${activateToken}`;
        const emailBody = `
        <p>Hello ${store.name},</p>
        <p>Please click on the following link to activate your store account:</p>
        <a href="${activationURL}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">→ Click Here ←</a>
        <p>Thank you!</p> `;
        // AFTER SUCCESSFULLY VERIFICATION I GO CON SEND A WELCOME EMAIL TO THEM AND OUR TERMS AND SERVICES DOCS THINGS LIKE THAT
        try {
            const sendingEmail = await sendMail({
                email: store.email,
                subject: "Activate your store account",
                html: emailBody,
            });
            res.status(200).json({
                success: true,
                message: `Check your email:- ${store.email} for store activation link.`
            });
        }
        catch (error) {
            return next(createDataBaseError("Error sending activation email"));
        }
    }
    catch (error) {
        if (error instanceof Error) {
            //console.error("Error creating store:", error);
            return next(createDataBaseError(error.message));
        }
        return next(createDataBaseError("An unknown Error occurred"));
    }
});
//Creating the activation token for the Store
const createActivationToken = (store) => {
    const payload = store; // taking the store payload(data/details) to make as the jwt token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("Missing JWT_SECRET environment variable");
    }
    return jwt.sign(payload, secret, { expiresIn: "5m" });
};
storeRouter.post('store/verify-email', catchAsync(async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const decoded = jwt.verify(activation_token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(createvalidateError("Invalid or expired token"));
        }
        //take the details from the decoded token
        const { name, email, avatar, password, address, phoneNumber } = decoded;
        let store = await Store.findOne({ email });
        if (store) {
            return next(createvalidateError("Store already exist with this email"));
        }
        store = await Store.create({
            name,
            email,
            address,
            phoneNumber,
            password,
            avatar
        });
        sendToken(store, 201, res);
    }
    catch (error) {
        console.log(error);
        return next(createDataBaseError("An error occurred while verifying the email"));
    }
}));
export default storeRouter;
