import User from "../models/Users.js";
import express from "express";
import { createvalidateError, createDataBaseError } from "../utils/ErrorHandler.js";
import path from "path";
import { upload } from "../multer.js";
import fs from 'fs';
const userRouter = express.Router();
userRouter.post('/create-user', upload.single("file"), async (req, res, next) => {
    try {
        const { fname, lname, email, password } = req.body;
        // const avatar = req.file? req.file.path : path.join(__dirname, '../public/uploads/default.jpg');
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            const filename = req.file?.filename;
            const filepath = `uploads/${filename}`; // incase the user already exists we are not storing the file sent doing registeration for it will chop the server space
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.log(err);
                    return next(createDataBaseError("Error deleting file")); // Handle file deletion error
                }
                else {
                    res.status(200).json({ message: "file deleted Successfully" });
                }
            });
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
        const newUser = await User.create(user);
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    }
    catch (error) {
        // Use the appropriate error handler
        if (error instanceof Error) {
            return next(createDataBaseError(error.message)); // Handle unexpected DB errors
        }
        return next(createDataBaseError("An unknown error occurred"));
    }
});
export default userRouter;
