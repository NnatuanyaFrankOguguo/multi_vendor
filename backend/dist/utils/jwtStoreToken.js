const sendStoreToken = (store, statusCode, res, options = {}) => {
    try {
        const token = store.getJwtToken();
        const expiration = parseInt(process.env.JWT_COOKIE_EXPIRATION, 10) || 7;
        // Cookie options
        const cookieOptions = {
            expires: new Date(Date.now() + expiration * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        };
        // Set the cookie
        res.cookie("strs-tk", token, cookieOptions);
        // Handle redirect case (for OAuth)
        if (options.redirect && options.redirectUrl) {
            return res.redirect(options.redirectUrl);
        }
        // Handle regular API response case
        return res.status(statusCode).json({
            success: true,
            store,
            token,
        });
    }
    catch (error) {
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
export default sendStoreToken;
