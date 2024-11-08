// import ErrorHandler from '../utils/ErrorHandler.js';
// import { Request, Response, NextFunction } from 'express';

// // Error handling middleware
// export default (error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
//     error.statusCode = error.statusCode || 500;
//     error.message = error.message || 'Internal Server Error';

//     // Check if the error is a MongoDB CastError (invalid ID, etc.)
//     if (error.name === 'CastError') {
//         // Type assertion to tell TypeScript that error is a CastError
//         const castError = error as { path: string }; // Cast error to include path property
//         const message = `Resource not found with this ID... Invalid ${castError.path}.`;
//         error = new ErrorHandler(message, 400);
//     }


//     if(error.code === )

//     // Send the error response to the client
//     res.status(error.statusCode).json({
//         success: false,
//         message: error.message,
//         stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
// };

import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../utils/ErrorHandler.js";

export const errorMiddleware = (err : ErrorHandler, req: Request, res: Response, next: NextFunction ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";

    //Logging the error (optional)
    console.error(`Error: ${message}, Stack Trace: ${err.stack}, status code: ${statusCode}`);

    //Sending response
    res.status(statusCode).json({
        status: "error",
        statusCode, 
        message,   
    })
};

//handles 404 errors for unknown routes but still the same domain
export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Page not found"
    });
};

//now to integrate the middleware into my entry point in the express App index.ts
