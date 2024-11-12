import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config({ path: './.env' });
// Define Google strategy options
const googleOptions = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET_ID,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    passReqToCallback: true, // Ensures `request` is passed to the verify function
};
// Configure the Google strategy
passport.use(new GoogleStrategy(googleOptions, async (request, // The request object passed from the middleware
accessToken, // The OAuth access token
refreshToken, // The OAuth refresh token
profile, // The profile information from Google
done // Callback function
) => {
    // Your logic here, e.g., create or update the user in the database
    console.log(profile);
    return done(null, profile); // Proceed with the user profile (for session management)
}));
// Serialize and deserialize user sessions
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
export default passport;
