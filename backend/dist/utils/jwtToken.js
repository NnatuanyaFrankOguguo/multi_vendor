const sendToken = (user, statusCode, res) => {
    try {
        const token = user.getJwtToken();
        const expiration = parseInt(process.env.JWT_COOKIE_EXPIRATION, 10) || 7;
        // Set token as a cookie on the client siden
        const options = {
            expires: new Date(Date.now() + expiration * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true only in production
            // Prevents the browser from sending the cookie in cross-site requests
        };
        res.status(statusCode).cookie("token", token, options).json({
            success: true,
            user,
            token,
        });
    }
    catch (error) {
        // Handle token generation failure
        res.status(500).json({ success: false, message: 'Token generation failed' });
    }
};
export default sendToken;
