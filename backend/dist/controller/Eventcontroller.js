import express from "express";
import Event from "../models/Events.js";
import { upload } from "../multer.js";
import { catchAsync } from "../middleware/catchAsync.js";
import { createvalidateError, createDataBaseError } from "../utils/ErrorHandler.js";
import Store from "../models/Store.js";
import isStoreAuthenticated from "../middleware/storeauth.js";
import fs from 'fs/promises';
import path from 'path';
const eventRouter = express.Router();
//create a new product
eventRouter.post('/create-event', upload.array("images"), catchAsync(async (req, res, next) => {
    // TODO: Validate and sanitize inputs
    try {
        // we will find the store by id first... to be able to indicate where the product will be stored in the database
        const storeId = req.body.storeId;
        const store = await Store.findById(storeId);
        if (store) {
            // Validate images
            const files = req.files; // Files might be undefined
            //bcos the incoming image from the frontend is multiple images which will be stored as an array
            //we will now iterate through each image stored in the files
            const imageUrls = Array.isArray(files) ? files.map((file) => `/images/${file.filename}`) : []; //This ensures imageUrls is never undefined and avoids unnecessary error handling.
            const eventData = req.body;
            eventData.images = imageUrls;
            eventData.storeInfo = store;
            // Create product
            const event = await Event.create(eventData);
            res.status(201).json({
                success: true,
                event,
                message: 'Event created successfully'
            });
        }
        else {
            return next(createvalidateError("Store ID is invalid!"));
        }
    }
    catch (error) {
        return next(createDataBaseError("An error occurred while creating a event"));
    }
}));
eventRouter.get('/get-all-events-store/:id', catchAsync(async (req, res, next) => {
    try {
        const events = await Event.find({ storeId: req.params.id });
        res.status(201).json({
            success: true,
            events,
        });
    }
    catch (error) {
        return next(createDataBaseError("An error occurred while fetching events"));
    }
}));
const deleteFile = async (filename) => {
    try {
        const filePath = path.join(process.cwd(), 'uploads', filename); // properly join path without extra slashes
        await fs.unlink(filePath);
        console.log('File deleted:', filePath);
    }
    catch (error) {
        console.error('File deletion error:', error);
    }
};
//delete product of a store
eventRouter.delete('/delete-event/:id', isStoreAuthenticated, catchAsync(async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return next(createvalidateError("Event ID is invalid!"));
        }
        // Delete images
        const imageUrls = event.images;
        for (const image of imageUrls) {
            const imageName = image.replace('/images/', '');
            await deleteFile(imageName);
        }
        await Event.findByIdAndDelete(eventId);
        res.status(201).json({
            success: true,
            message: 'Event deleted successfully'
        });
    }
    catch (error) {
        return next(createDataBaseError("An error occurred while deleting a event"));
    }
}));
export default eventRouter;
