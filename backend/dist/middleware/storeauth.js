import { catchAsync } from "../middleware/catchAsync.js";
import { createAuthError } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import Store from "../models/Store.js";
const isStoreAuthenticated = catchAsync(async (req, res, next) => {
    //user token being sent from the frontend when the user logs in, using the headers
    const { strs_tk } = req.cookies;
    if (!strs_tk) {
        return next(createAuthError("Store not authenticated, Please login to continue."));
    }
    try {
        const decoded = jwt.verify(strs_tk, process.env.JWT_SECRET);
        //after the decoded token we will get that user.id we use to create the token at first
        //the user.id is crucial to assess all the users data in the database easily cos of its uniqueness and any other linked to it
        const store = await Store.findById(decoded.id);
        // after Geting the user data associated with the token
        if (!store) {
            return next(createAuthError("Store not found"));
        }
        req.store = store; // No need to cast `req.user`, the type is now inferred in src > types > express.d.ts (i no know about this problem i will look into it later)
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(createAuthError("Token Expired, please log in again."));
        }
        return next(createAuthError("Token is invalid, please log in."));
    }
});
export default isStoreAuthenticated;
