// import ErrorHandler from '../utils/ErrorHandler.js';
// import { Request, Response, NextFunction } from 'express';
export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    //Logging the error (optional)
    console.error(`Error: ${message}, Stack Trace: ${err.stack}, status code: ${statusCode}`);
    //Sending response to the frontend
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    });
};
//handles 404 errors for unknown routes but still the same domain
export const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Page not found"
    });
};
//now to integrate the middleware into my entry point in the express App index.ts
