import express from "express";
import passport from 'passport';
const googleRouter = express.Router();
googleRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// googleRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: 'http://localhost:5173/login'}), // Redirect to the frontend login page if authentication fails
//     // On success, redirect to the frontend homepage
//     (req: Request, res: Response) => {
//         res.redirect('http://localhost:5173/');
//     });
// Modified version to handle error messages and send JSON response to frontend
googleRouter.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }, async (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'An error occurred while authenticating with Google' });
        }
        if (!user) {
            res.status(401).json({ success: false, message: info?.message || 'Authentication failed', redirect: '/login' });
            // Perform the redirect after a slight delay (using setTimeout)
            setTimeout(() => {
                res.redirect('http://localhost:5173/login');
            }, 1000); // Adjust the delay as needed
            return;
        }
        // Authentication successful, send success response or token
        res.status(200).json({ success: true, message: 'Authentication successful!' });
        res.redirect('http://localhost:5173/');
    })(req, res, next);
});
export default googleRouter;
