import { catchAsync } from "../middleware/catchAsync.js";
import { createAuthError } from "../utils/ErrorHandler.js";
import {Router, Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken"
import Store, {IStore} from "../models/Store.js"

// Define a type for the JWT payload
interface JwtPayloadWithId extends jwt.JwtPayload {
    id: string;
}


const isStoreAuthenticated = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    //user token being sent from the frontend when the user logs in, using the headers
    const {strs_tk} = req.cookies;
    if(!strs_tk)
    {
        return next(createAuthError("Store not authenticated, Please login to continue."));
    }
    try{
        const decoded = jwt.verify(strs_tk as string, process.env.JWT_SECRET as string) as JwtPayloadWithId;
        //after the decoded token we will get that user.id we use to create the token at first
        //the user.id is crucial to assess all the users data in the database easily cos of its uniqueness and any other linked to it
        const store: IStore | null = await Store.findById(decoded.id);
        // after Geting the user data associated with the token
        if (!store) {
            return next(createAuthError("Store not found"));
        }
        req.store = store;// No need to cast `req.user`, the type is now inferred in src > types > express.d.ts (i no know about this problem i will look into it later)

        next();
    } catch (error: any) {
        if(error.name === "TokenExpiredError") {
            return next(createAuthError("Token Expired, please log in again."));
        }

        return next(createAuthError("Token is invalid, please log in."));
    }
    
    
})

export default isStoreAuthenticated;