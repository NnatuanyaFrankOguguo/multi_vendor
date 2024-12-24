import { catchAsync } from "../middleware/catchAsync.js";
import { createAuthError } from "../utils/ErrorHandler.js";
import {Router, Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken"
import User, {IUser} from "../models/Users.js";

// Define a type for the JWT payload
interface JwtPayloadWithId extends jwt.JwtPayload {
    id: string;
}



const isAuthenticated = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    //user token being sent from the frontend when the user logs in, using the headers
    const {token} = req.cookies;
    if(!token)
    {
        return next(createAuthError("User not authenticated, Please login to continue."));
    }
    try{
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayloadWithId;
        //after the decoded token we will get that user.id we use to create the token at first
        //the user.id is crucial to assess all the users data in the database easily cos of its uniqueness and any other linked to it
        const user: IUser | null = await User.findById(decoded.id);
        // after Geting the user data associated with the token
        if (!user) {
            return next(createAuthError("User not found"));
        }
        req.user = user;// No need to cast `req.user`, the type is now inferred in src > types > express.d.ts

        next();
    } catch (error: any) {
        if(error.name === "TokenExpiredError") {
            return next(createAuthError("Token Expired, please log in again."));
        }

        return next(createAuthError("Token is invalid, please log in."));
    }
    
    
})

export default isAuthenticated;

