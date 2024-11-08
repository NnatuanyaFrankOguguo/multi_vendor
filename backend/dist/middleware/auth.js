import { catchAsync } from "../middleware/catchAsync.js";
import { Router } from "express";
const authMiddleware = catchAsync(async (req, res, next) => {
    const { token } = req.headers;
});
const router = Router();
