import { Schema, model } from 'mongoose';
import { Types } from 'mongoose';
// Enums for discount types
export var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "Percentage";
    DiscountType["FIXED"] = "Fixed";
})(DiscountType || (DiscountType = {}));
// Define the schema for the Coupon
const couponSchema = new Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    discountType: {
        type: String,
        enum: Object.values(DiscountType),
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userMaxUses: {
        type: Number,
        min: 1
    },
    usedCount: {
        type: Number,
        default: 0,
        min: 0
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    applicableProducts: [{
            type: Types.ObjectId,
            ref: 'Product'
        }],
    minPurchaseAmount: {
        type: Number
    },
    usedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});
// Indexes
couponSchema.index({ code: 1 });
couponSchema.index({ expirationDate: 1 });
couponSchema.index({ active: 1 });
// Pre-save validation
couponSchema.pre('save', function (next) {
    if (this.discountType === DiscountType.PERCENTAGE && this.discountValue > 100) {
        next(new Error('Percentage discount cannot exceed 100%'));
    }
    else if (this.userMaxUses && this.usedCount > this.userMaxUses) {
        next(new Error('Used count exceeds maximum uses'));
    }
    else {
        next();
    }
});
// Static methods
couponSchema.statics = {
    async isValid(code) {
        const coupon = await this.findOne({ code, active: true });
        if (!coupon)
            return false;
        if (coupon.expirationDate && coupon.expirationDate < new Date())
            return false;
        if (coupon.maxUses && coupon.usedCount >= coupon.maxUses)
            return false;
        return true;
    }
};
// Instance methods
couponSchema.methods = {
    async applyDiscount(userId, cartAmount) {
        if (!this.active)
            throw new Error('Coupon is not active');
        if (this.expirationDate && this.expirationDate < new Date())
            throw new Error('Coupon has expired');
        if (this.maxUses && this.usedCount >= this.maxUses)
            throw new Error('Coupon usage exceeded');
        if (this.minPurchaseAmount && cartAmount < this.minPurchaseAmount) {
            throw new Error(`Minimum purchase amount of ${this.minPurchaseAmount} required`);
        }
        let discount = 0;
        if (this.discountType === DiscountType.PERCENTAGE) {
            discount = cartAmount * (this.discountValue / 100);
        }
        else {
            discount = this.discountValue;
        }
        // Update usage
        this.usedCount += 1;
        this.usedBy.push(userId);
        await this.save();
        return Math.max(0, cartAmount - discount);
    }
};
export const Coupon = model('Coupon', couponSchema);
// Create a coupon & How to use
// const seasonalCoupon = new Coupon({
//     code: 'HARVEST24',
//     discountType: DiscountType.PERCENTAGE,
//     discountValue: 20,
//     expirationDate: new Date('2024-12-31'),
//     maxUses: 1000,
//     minPurchaseAmount: 500,
//     applicableCategories: [new Types.ObjectId('...')]
//   });
//   // Check validity
//   const isValid = await Coupon.isValid('HARVEST24');
//   // Apply discount
//   const cartTotal = 800;
//   const userId = new Types.ObjectId('...');
//   const coupon = await Coupon.findOne({ code: 'HARVEST24' });
//   const newTotal = await coupon.applyDiscount(userId, cartTotal);
