import express, { Request, Response, NextFunction } from "express";
import { catchAsync } from "../middleware/catchAsync.js";
import {z} from 'zod'
import { createvalidateError, createDataBaseError } from "../utils/ErrorHandler.js";
import Coupon, { ICoupon} from "../models/CouponCode.js";

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
        next(createDataBaseError(err.message));
    }
}));

export default couponRouter;