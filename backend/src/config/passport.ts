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
import sendToken from '../utils/jwtToken.js';

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
         // Your logic here, e.g., create or update the user in the database
      // console.log(profile);

      const newUser = {
        googleId: profile.id || undefined,
        fname: profile.name?.givenName || '',          // Use optional chaining
        lname: profile.name?.familyName || '',         // Provide fallback values
        email: profile.emails?.[0]?.value || '',       // Handle potentially undefined `emails`
        avatar: profile.photos?.[0]?.value || 'default-avatar-url', // Provide a default if needed
           // Set a default value if `public_id` is required but not provided
        password: '', // No password needed for google login
      }

      // Step 1: Check if the user already exists by email (whether logged in via email/password or Google)
      const existingUser =  await User.findOne({ email: newUser.email });

      if(existingUser)
      {
        if (req.res) {
          if (existingUser) {
              // Case 1: User exists and already has Google ID linked
              if (existingUser.googleId) {
                // If the user is already linked to Google, allow login via Google
                sendToken(existingUser, 200, req.res); // Send token for session management
                return
                // // After sending the token, redirect to homepage
                // req.res.redirect('http://localhost:5173/'); // Redirect to the homepage after login
                // return done(null, existingUser);
              } else {
                // Case 2: User exists with email/password but no Google ID
                existingUser.googleId = newUser.googleId!;
                await existingUser.save();

                // Send the token after linking the Google account
                sendToken(existingUser, 200, req.res);
                return
                // After sending the token, redirect to homepage
                //req.res.redirect('http://localhost:5173/'); // Redirect to homepage
                // return done(null, existingUser);
              }

              
            } 
          }
        }
     
        //else {
        //     // If the user is registered with email/password but trying to log in with Google, call done with an error
        //     return done(null, false, { message: 'This account was registered using email/password. Please log in with email.' });
        // }

      

        // Step 3: If no user exists with the given email, create a new user
        const randomPassword = crypto.randomBytes(16).toString('hex'); // Generate a random password
        const hashedPassword = await bcrypt.hash(randomPassword, 10); // Hash the password (for future use if they log in with email)
        
        // Add the password for future email-based login if needed
        const newUserWithPassword = { ...newUser, password: hashedPassword };

        // Generate activation token for email verification
        const activationToken = createActivationToken(newUserWithPassword);
        //activationURL for verification of email
        const activationURL = `http://localhost:5173/verify-email/${activationToken}`;
        const emailBody = `
        <p>Hello ${newUserWithPassword.fname},</p>
        <p>Please click on the following link to activate your account:</p>
        <a href="${activationURL}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">→ Click Here ←</a>
        <p>Thank you!</p>
        `;
        try {
          const sendingEmail = await sendMail({
            email: newUserWithPassword.email,
            subject: "Activate your account",
            html: emailBody,
          })
          req.res?.status(200).json({
            success: true,
            message: `Check your email:- ${newUserWithPassword.email} User for activation link.`,
            data: sendingEmail, // You can also send the activation link in the response data for immediate use
          })
          
          // return done(null, false); // Return false to indicate activation is pending
      } catch (error) {
          return done(error);
        }
        // If not, create a new user
        // const createUser = await User.create(newUserWithPassword)
        // done(null, createUser); // Proceed with the user profile (for session management)
      
      
      
     } catch (error) {
      console.error("Error in Google Strategy:", error);
      return done(error); // Handle any unexpected errors
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
