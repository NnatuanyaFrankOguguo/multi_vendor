import express from "express";
import passport from 'passport';
const googleRouter = express.Router();
googleRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
googleRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dashboard');
});
export default googleRouter;
