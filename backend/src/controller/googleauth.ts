import express, { Request, Response, NextFunction } from "express";
import passport from 'passport';
import sendToken from '../utils/jwtToken.js';
import { createvalidateError } from '../utils/ErrorHandler.js';
const googleRouter = express.Router();

// Initial Google authentication route
googleRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'], session: false }));


googleRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: `${process.env.FRONTEND_URL}/login`, session: false}), // Redirect to the frontend login page if authentication fails
    // On success, redirect to the frontend homepage
    (req: Request, res: Response) => {

        // If authentication fails, this will not be reached
        if(!req.user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login`); // No need to call res.redirect again
        }

        // Important: Redirect AFTER setting the token
        // Use the enhanced sendToken with redirect option
        sendToken(req.user, 200, res, {
            redirect: true,
            redirectUrl: process.env.FRONTEND_URL
        });
    });

googleRouter.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send("Error logging out");
        res.clearCookie("authToken");
        res.redirect(`${process.env.FRONTEND_URL}/login?error=callback_failed`);
    });
    });

export default googleRouter;