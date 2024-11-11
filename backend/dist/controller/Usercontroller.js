import User from "../models/Users.js";
import express from "express";
import { createvalidateError } from "../utils/ErrorHandler.js";
import { upload } from "../multer.js";
const router = express.Router();
router.post('/create-user', upload.single("file"), async (req, res, next) => {
    const { name, email, password } = req.body;
    // const avatar = req.file? req.file.path : path.join(__dirname, '../public/uploads/default.jpg');
    const userEmail = await User.find({ email });
    if (userEmail) {
        return next(createvalidateError("User already exists"));
    }
});
