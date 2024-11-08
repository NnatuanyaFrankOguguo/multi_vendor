import { catchAsync } from "../middleware/catchAsync.js";
import { createAuthError } from "../utils/ErrorHandler.js";
import {Router, Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken"

const authMiddleware = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.headers;
    
})

const router = Router();

