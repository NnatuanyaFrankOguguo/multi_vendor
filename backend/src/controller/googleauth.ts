import express, { Request, Response, NextFunction } from "express";
import passport from 'passport';
const googleRouter = express.Router();

// Initial Google authentication route
googleRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));


googleRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:5173/login', session:false}), // Redirect to the frontend login page if authentication fails
    // On success, redirect to the frontend homepage
    (req: Request, res: Response) => {
        res.redirect('http://localhost:5173/');
    });




// Modified version to handle error messages and send JSON response to frontend
// Single callback route with improved error handling and redirection

// googleRouter.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
//     passport.authenticate('google', { session: false }, async (err: any, user: IUser | null, info: { message: string } | undefined) => {
//         try {
//             if (err) {
//                 console.error('Google authentication error:', err);
//                 return res.redirect('http://localhost:5173/login?error=auth_failed');
//             }

//             if (!user) {
//                 // Handle case where user needs to verify email
//                 if (info?.message === 'EMAIL_VERIFICATION_REQUIRED') {
//                     return res.redirect('http://localhost:5173/verify-email-sent');
//                 }
//                 return res.redirect('http://localhost:5173/login?error=no_user');
//             }

//             // Set any necessary cookies or tokens here
//             // Assuming you have a function to set JWT token in cookie
            
//             // Successful authentication, redirect to home page
//             return res.redirect('http://localhost:5173/');
//         } catch (error) {
//             console.error('Callback handling error:', error);
//             return res.redirect('http://localhost:5173/login?error=server_error');
//         }
//     })(req, res, next);
// });

export default googleRouter;