// //using class as our ErrorHandler
// class ErrorHandler extends Error {
//     statusCode: number;  // Declare the statusCode property
//     path?: string; // Optional path property, for MongoDB CastError cases.
//     constructor(message: string, statusCode: number, path?: string) {
//         super(message);  // Call the parent class (Error) constructor with the message
//         this.statusCode = statusCode;  // Set the custom statusCode property
//         // Set the optional path property if provided
//         if (path) {
//             this.path = path;  // Set path if it's provided.
//         }
//         Error.captureStackTrace(this,this.constructor); // Capture
//     }
// }
// export default ErrorHandler;
class ErrorHandler extends Error {
    statusCode;
    message;
    isOperational;
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
//factory functions for specific error types
export const createAuthError = (message = "Authentication Error") => new ErrorHandler(401, message);
export const createDataBaseError = (message = "Database Error") => new ErrorHandler(500, message);
export const createvalidateError = (message = "Validation Error") => new ErrorHandler(400, message);
export const createNotFoundError = (message = "Not Found Error") => new ErrorHandler(404, message);
export default ErrorHandler;
