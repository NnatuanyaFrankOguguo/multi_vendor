import  mongoose, {Document, Schema, model} from 'mongoose';
import { Types } from 'mongoose';

// Enums for discount types
export enum DiscountType {
    PERCENTAGE = 'Percentage',
    FIXED = 'Fixed'
}

// Define an interface for the Coupon

export interface ICoupon extends Document {
    code: string;
    discountValue: number;
    discountType: DiscountType;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
    usedCount: number;
    storeId: Types.ObjectId;
    applicableProducts: Types.ObjectId[];
    minPurchaseAmount?: number;
    createdAt: Date;
    updatedAt: Date;
    userMaxUses?: number;
    usedBy?: Types.ObjectId[];
    applyDiscount(userId: Types.ObjectId, cartAmount: number): Promise<number>; // Fixed return type

}

// Define the schema for the Coupon

const couponSchema = new Schema<ICoupon>({
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
        type: Schema.Types.ObjectId,
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
})

// Indexes
couponSchema.index({ code: 1 });
couponSchema.index({ endDate: 1 });
couponSchema.index({ isActive: 1 });

// Pre-save validation
couponSchema.pre<ICoupon>('save', function(next) {
  if (this.discountType === DiscountType.PERCENTAGE && this.discountValue > 100) {
    next(new Error('Percentage discount cannot exceed 100%'));
  } else if (this.userMaxUses && this.usedCount > this.userMaxUses) {
    next(new Error('Used count exceeds maximum uses'));
  } else {
    next();
  }
});

// Static methods To validate a coupon by its code before applying it.

// Instance methods
couponSchema.methods = {
  async applyDiscount(userId: Types.ObjectId, cartAmount: number): Promise<number> {
    if (!this.isActive) throw new Error('Coupon is not active');
    if (this.endDate && this.endDate < new Date()) throw new Error('Coupon has expired');
    if (this.maxUses && this.usedCount >= this.maxUses) throw new Error('Coupon usage exceeded');
    if (this.minPurchaseAmount && cartAmount < this.minPurchaseAmount) {
      throw new Error(`Minimum purchase amount of ${this.minPurchaseAmount} required`);
    }

    let discount = 0;
    
    if (this.discountType === DiscountType.PERCENTAGE) {
      discount = cartAmount * (this.discountValue / 100);
    } else {
      discount = this.discountValue;
    }

    // Update usage
    this.usedCount += 1;
    this.usedBy.push(userId);
    await this.save();

    return Math.max(0, cartAmount - discount);
  }
};

const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);

export default Coupon;

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