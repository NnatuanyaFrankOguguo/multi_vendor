import User from "../models/Users.js";
import express, { Request, Response, NextFunction } from "express";
import { createvalidateError } from "../utils/ErrorHandler.js";
import path from "path";
import {upload} from "../multer.js"

const router = express.Router();

router.post('/create-user', upload.single("file"), async (req : Request, res : Response, next: NextFunction) => {
    const { fname, lname,  email, password } = req.body;
    // const avatar = req.file? req.file.path : path.join(__dirname, '../public/uploads/default.jpg');
    const userEmail = await User.find({email})
    if(userEmail)
    {
        return next(createvalidateError("User already exists"))
    }
})




