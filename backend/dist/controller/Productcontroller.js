import express from "express";
import Product from "../models/Product.js";
import { upload } from "../multer.js";
import { catchAsync } from "../middleware/catchAsync.js";
import { createvalidateError, createDataBaseError } from "../utils/ErrorHandler.js";
import Store from "../models/Store.js";
import isStoreAuthenticated from "../middleware/storeauth.js";
const productRouter = express.Router();
//create a new product
productRouter.post('/create-product', upload.array("images"), catchAsync(async (req, res, next) => {
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
            const productData = req.body;
            productData.images = imageUrls;
            productData.storeInfo = store;
            // Create product
            const product = await Product.create(productData);
            res.status(201).json({
                success: true,
                product,
                message: 'Product created successfully'
            });
        }
        else {
            return next(createvalidateError("Store ID is invalid!"));
        }
    }
    catch (error) {
        return next(createDataBaseError("An error occurred while creating a product"));
    }
}));
productRouter.get('/get-all-products-store/:id', catchAsync(async (req, res, next) => {
    try {
        const products = await Product.find({ storeInfo: req.params.id });
        res.status(201).json({
            success: true,
            products,
        });
    }
    catch (error) {
        return next(createDataBaseError("An error occurred while fetching products"));
    }
}));
//delete product of a store
productRouter.delete('/delete-product/:id', isStoreAuthenticated, catchAsync(async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return next(createvalidateError("Product ID is invalid!"));
        }
        res.status(201).json({
            success: true,
            message: 'Product deleted successfully'
        });
    }
    catch (error) {
        return next(createDataBaseError("An error occurred while deleting a product"));
    }
}));
export default productRouter;
