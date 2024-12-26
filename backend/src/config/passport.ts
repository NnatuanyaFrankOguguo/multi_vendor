import passport from 'passport'; 
import { Strategy as GoogleStrategy, StrategyOptionsWithRequest } from 'passport-google-oauth2';
import dotenv from 'dotenv';
import { Request } from 'express';
import { Profile as GoogleProfile } from 'passport';
import User from '../models/Users.js';

// Load environment variables
dotenv.config({ path: './.env' });

// Define Google strategy configuration
const googleOptions: StrategyOptionsWithRequest = {
  clientID: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET_ID as string,
  callbackURL: 'http://localhost:5000/auth/google/callback',
  passReqToCallback: true, // Ensures `request` is passed to the verify function
};

// Configure the Google strategy callback function
passport.use(
  new GoogleStrategy(
    googleOptions,
    async (
      req: Request, // The request object passed from the middleware
      accessToken: string, // The OAuth access token
      refreshToken: string, // The OAuth refresh token
      profile: GoogleProfile, // The profile information from Google
      done: (error: any, user?: any, info?: any) => void // Callback function
    ) => {
     try {
      // Step 1: Check if the user already exists by googleid (whether logged in via email/password or Google)
      let user =  await User.findOne({ googleId: profile.id });
      console.log("Existing user by googleId:", user ? "Found" : "Not found");

      if(!user)
      {
        // if no google ID, Check if a user with the same email exists
        const email = profile.emails?.[0]?.value || "";
        console.log("Checking email:", email);

        user = await User.findOne({ email });
        console.log("Existing user by email:", user ? "Found" : "Not found");

        if(user) {
          console.log("Updating existing user with googleId");
          // If the user exists with the same email, update their Google ID
          user.googleId = profile.id;
          await user.save();
        }else {
          console.log("Creating new user");
          // Create a new user if no user exists with the same email
          // Your logic here, e.g., create or update the user in the database
          // console.log(profile);

          const newUser = await User.create({
            googleId: profile.id,
            fname: profile.name?.givenName || '',          // Use optional chaining
            lname: profile.name?.familyName || '',         // Provide fallback values
            email: email,       // Handle potentially undefined `emails`
            avatar: profile.photos?.[0]?.value || 'default-avatar-url', // Provide a default if needed
              // Set a default value if `public_id` is required but not provided
          
          });

          console.log("New user data:", newUser);

        } 
      }

      if (!user) {
        console.log("No user object after all operations!");
        return done(new Error('Failed to create or retrieve user'), null);
      }

      console.log("Google Strategy - Success, returning user");



      return done(null, user); // Proceed with the user profile (for session management)
     } catch (error) {
      console.error("Error in Google Strategy:", error);
      return done(error, null); // Handle any unexpected errors
     }
      
    }
  )
);

// Serialize and deserialize user sessions

passport.serializeUser((user: any, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
     const user = await User.findById(id);
     done(null, user);
  } catch (err) {
     done(err, null);
  }
});

export default passport;
