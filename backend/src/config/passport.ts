import passport from 'passport'; 
import { Strategy as GoogleStrategy, StrategyOptionsWithRequest } from 'passport-google-oauth2';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { Request } from 'express';
import bcrypt from 'bcrypt';
import { Profile as GoogleProfile } from 'passport';
import { createvalidateError } from '../utils/ErrorHandler.js';
import User from '../models/Users.js';
import sendMail from '../utils/sendMail.js';
import { createActivationToken } from '../controller/Usercontroller.js';

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
      req: Request, // The request object passed from the middleware
      accessToken: string, // The OAuth access token
      refreshToken: string, // The OAuth refresh token
      profile: GoogleProfile, // The profile information from Google
      done: (error: any, user?: any, info?: any) => void // Callback function
    ) => {
      // Your logic here, e.g., create or update the user in the database
      // console.log(profile);
      const randomPassword = crypto.randomBytes(16).toString('hex'); // Generate a random password
      const hashedPassword = await bcrypt.hash(randomPassword, 10); // Hash the password

      const newUser = {
        googleId: profile.id || undefined,
        fname: profile.name?.givenName || '',          // Use optional chaining
        lname: profile.name?.familyName || '',         // Provide fallback values
        email: profile.emails?.[0]?.value || '',       // Handle potentially undefined `emails`
        avatar: profile.photos?.[0]?.value || 'default-avatar-url', // Provide a default if needed
           // Set a default value if `public_id` is required but not provided
        password: hashedPassword, // Hash the password
      }

      // Check if the user already exists in the database
      const userEmail = await User.findOne({  $or: [
        { email: newUser.email },
        { googleId: newUser.googleId },  // Only check googleId if it's set
    ]})
      if(userEmail )
      {
        done(null, userEmail)
      }else{
        //to create token for our user
        const activationToken = createActivationToken(newUser)

        //activationURL for verification of email
        const activationURL = `http://localhost:5173/verify-email/${activationToken}`;
        try {
          const sendingEmail = await sendMail({
            email: newUser.email,
            subject: "Activate your account",
            text: `Hello ${newUser.fname}, \nPlease click on the following link to activate your account: ${activationURL}`,
          })
          req.res?.status(200).json({
            success: true,
            message: `User created successfully. Check your email:- ${newUser.email} for activation link.`,
            data: sendingEmail, // You can also send the activation link in the response data for immediate use
          }) 
          
        } catch (error) {
          return done(error);
        }
        // If not, create a new user
        // const createUser = await User.create(newUser)
        // done(null, createUser); // Proceed with the user profile (for session management)
      }
      
      
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
