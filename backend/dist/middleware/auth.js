import { catchAsync } from "../middleware/catchAsync.js";
import { createAuthError } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
const isAuthenticated = catchAsync(async (req, res, next) => {
    //user token being sent from the frontend when the user logs in, using the headers
    const { token } = req.cookies;
    if (!token) {
        return next(createAuthError("User not authenticated, Please login to continue."));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //after the decoded token we will get that user.id we use to create the token at first
        //the user.id is crucial to assess all the users data in the database easily cos of its uniqueness and any other linked to it
        const user = await User.findById(decoded.id);
        // after Geting the user data associated with the token
        if (!user) {
            return next(createAuthError("User not found"));
        }
        req.user = user; // No need to cast `req.user`, the type is now inferred in src > types > express.d.ts
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(createAuthError("Token Expired, please log in again."));
        }
        return next(createAuthError("Token is invalid, please log in."));
    }
});
export default isAuthenticated;
