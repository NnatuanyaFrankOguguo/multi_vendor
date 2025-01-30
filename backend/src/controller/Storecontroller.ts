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


const storeRouter = express.Router();



export default storeRouter 