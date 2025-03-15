import express, { Request, Response, NextFunction } from "express";
import { catchAsync } from "../middleware/catchAsync.js";
import {z} from 'zod'
import { createvalidateError, createDataBaseError } from "../utils/ErrorHandler.js";
import Coupon from "../models/CouponCode.js";
import isStoreAuthenticated from "../middleware/storeauth.js";

const couponRouter = express.Router();

couponRouter.post('/create-coupon', catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Validate and sanitize inputs
    try {

        const couponCodeExist = await Coupon.findOne({code: req.body.code});

        if(couponCodeExist){
            return next(createvalidateError("Coupon code already exists!"))
        }

        const coupon = await Coupon.create({
          code: req.body.code,
          discountValue: req.body.discountValue,
          discountType: req.body.discountType,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          minPurchaseAmount: req.body.minPurchaseAmount,
          userMaxUses: req.body.userMaxUses,
          storeId: req.body.storeId,
          applicableProducts: req.body.applicableProducts, // Mongoose will cast them to ObjectIds
        });
        

        res.status(201).json({
            success: true,
            coupon,
            message: 'Coupon created successfully'
        })

    } catch (error : unknown) {
        const err = error as Error;
        console.log(err.message);
        return next(createDataBaseError("An error occurred while creating a coupon"))
        
    }
}));

couponRouter.get('/get-all-coupons/:id', isStoreAuthenticated, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coupons = await Coupon.find({storeId : req.params.id}); // to return an array of Coupons

        res.status(201).json({
            success: true,
            coupons,
        })
        
    } catch (error : unknown) {
        const err = error as Error;
        console.log(err.message);
        return next(createDataBaseError("An error occurred while fetching coupons"))
        
    }
}));

couponRouter.delete('/delete-coupon/:id', isStoreAuthenticated, catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const couponCode = await Coupon.findByIdAndDelete(req.params.id);
  
        if (!couponCode) {
          return next(createvalidateError("Coupon code not found!"));
        }
        res.status(201).json({
          success: true,
          message: "Coupon code deleted successfully!",
        });
      } catch (error) {
        return next(createvalidateError("An error occurred while deleting coupons"))
      }
}));

// get coupon code value by its name // VALIDATE Coupon Code
couponRouter.get(
    "/get-coupon-value",
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      try {
        // TODO: validate and sanitize inputs
        const { code } = req.body;  
        const couponCode = await Coupon.findOne({ code, isActive: true});

        if (!couponCode) {
          return next(createvalidateError("Coupon code not found or inactive!"));
        }

        if (couponCode.endDate && couponCode.endDate < new Date()) {
          return next(createvalidateError("Coupon code has expired!"));
        }
  
        res.status(200).json({
          success: true,
          message: 'Coupon is valid',
          couponCode,
        });
      } catch (error) {
        return next (createDataBaseError('An error occured while getting coupon code'));
      }
    })
  );

// APPLY Coupon (apply discount to cart)
couponRouter.get('/coupon-apply',  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: validate and sanitize inputs
        const { cartAmount, code, userId } = req.body;

        if (!cartAmount || !code || !userId) {
            return next(createvalidateError('Missing required fields!'));
          }

        const couponCode = await Coupon.findOne({ code, isActive: true });

        if (!couponCode) {
            return next(createvalidateError('Coupon code not found or inactive!'));
        }

        const discountedAmount = await couponCode.applyDiscount(userId, cartAmount)

        res.status(200).json({
            success: true,
            message: 'Discount applied successfully',
            discountedAmount,
          });
      

    } catch (error) {
        return next(createDataBaseError('An error occurred while applying coupon'));
    }
}))



export default couponRouter;