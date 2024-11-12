import passport from 'passport'; 
import { Strategy as GoogleStrategy, StrategyOptionsWithRequest } from 'passport-google-oauth2';
import dotenv from 'dotenv';
import { Profile as GoogleProfile } from 'passport';

// Load environment variables
dotenv.config({ path: './.env' });

// Define Google strategy options
const googleOptions: StrategyOptionsWithRequest = {
  clientID: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET_ID as string,
  callbackURL: 'http://localhost:5000/auth/google/callback',
  passReqToCallback: true, // Ensures `request` is passed to the verify function
};

// Configure the Google strategy
passport.use(
  new GoogleStrategy(
    googleOptions,
    async (
      request: any, // The request object passed from the middleware
      accessToken: string, // The OAuth access token
      refreshToken: string, // The OAuth refresh token
      profile: GoogleProfile, // The profile information from Google
      done: (error: any, user?: any, info?: any) => void // Callback function
    ) => {
      // Your logic here, e.g., create or update the user in the database
      console.log(profile);
      return done(null, profile); // Proceed with the user profile (for session management)
    }
  )
);

// Serialize and deserialize user sessions

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user as Express.User);
})

export default passport;
