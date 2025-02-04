// //create token and saving that in cookies
// import { Response } from 'express'; // Import the Response type
// const sendToken = (user: any, statusCode : number, res: Response) => {
//     try {
//         const token = user.getJwtToken();
//         const expiration = parseInt(process.env.JWT_COOKIE_EXPIRATION as string, 10) || 7;

//          // Create a safe user object to send to the frontend
//         const userToSend = {
//             _id: user._id,
//             fname: user.fname,
//             lname: user.lname,
//             email: user.email,
//             role: user.role,
//             avatar: user.avatar,
//             isVerified: user.isVerified,
//             address: user.address,
//             createdAt: user.createdAt,
//             updatedAt: user.updatedAt,
//             googleId: user.googleId ?? null, // Optional, if used
//         };

    
//         // Set token as a cookie on the client siden
//         const options = {
//             expires: new Date(Date.now() + expiration * 24 * 60 * 60 * 1000),
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',  // Set to true only in production
//               // Prevents the browser from sending the cookie in cross-site requests
//         };


        

//         res.status(statusCode).cookie("token", token, options).json({
//             success: true,
//             user: userToSend,
//             token,
//         });
        
//     } catch (error) {
//          // Handle token generation failure
//          console.error("Token generation error:", error);
//          res.status(500).json({ success: false, message: 'Token generation failed' });
//     }
    
    
// };

// // utils/sendGoogleToken.ts


// export default sendToken;

// utils/jwtToken.ts
import { Response } from 'express';

interface SendTokenOptions {
  redirect?: boolean;
  redirectUrl?: string;
}

const sendToken = (
  user: any, 
  statusCode: number, 
  res: Response, 
  options: SendTokenOptions = {}
) => {
    try {
        const token = user.getJwtToken();
        const expiration = parseInt(process.env.JWT_COOKIE_EXPIRATION as string, 10) || 7;

        // Create a safe user object to send to the frontend
        const userToSend = {
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            isVerified: user.isVerified,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            googleId: user.googleId ?? null,
        };

        // Cookie options
        const cookieOptions = {
            expires: new Date(Date.now() + expiration * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            
        };

        // Set the cookie
        res.cookie("us_tk", token, cookieOptions);

        // Handle redirect case (for OAuth)
        if (options.redirect && options.redirectUrl) {
            return res.redirect(options.redirectUrl);
        }

        // Handle regular API response case
        return res.status(statusCode).json({
            success: true,
            user: userToSend,
            token,
        });
        
    } catch (error) {
        console.error("Token generation error:", error);
        
        // Handle OAuth redirect error
        if (options.redirect && options.redirectUrl) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=token_generation`);
        }
        
        // Handle regular API error
        return res.status(500).json({ 
            success: false, 
            message: 'Token generation failed' 
        });
    }
};

export default sendToken;