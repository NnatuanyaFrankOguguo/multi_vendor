import mongoose, {Document, Schema, Types} from "mongoose";

//Product review interface
export interface IProduct extends Document {
    name: string;
    description: string;
    category: string; //Enables filtering/sorting
    discountPrice: number;
    originalPrice?: number;
    // currency: string;
    unit?: string;
    stock: number;
    highlight?: string;
    store?: Types.ObjectId; // Reference to Store model
    storeId: string; // Reference to specific Store
    harvestDate?: Date;
    expirationDate?: Date;
    organicCertified: boolean;
    images: string[];
    reviews?: Types.ObjectId[];
    soldOut: number;
    // reviews: Types.ObjectId[]; // Reference to Review model
    createdAt: Date;
    updatedAt: Date;
    // Additional fields
    shippingWeight: number;
    availableForBulk?: boolean;
    tags?: string[]; //Improved searchability
    minOrderQuantity: number;
    isAvailable?: boolean;
    isApproved?: boolean;
    //discount?: { percentage: number; expiresAt: Date };
    rating?: number; //Average rating from product Reviews then calculate it below and add here
    discountPercentage?: number;
    discountExpiresAt: Date;
    

}


const productSchema: Schema<IProduct> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    highlight: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    discountPrice: {
        type: Number,
        required: [true, 'Product\' real price is required'],
    },
    originalPrice: {
        type: Number,
        required: false,
    },
    unit: {
        type: String,
        required: false,
        enum: ['kg', 'lbs', 'g', 'ml', "ton", "liter", "piece", "crate", "dozen"]
    },
    stock: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: 0
    },
    images: {
        type: [String],
        validate: {
            validator: (v: string[]) => v.length <= 5,
            message: "Product images cannot exceed 5"
        }
    },
    storeId: {
        type: String,
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    soldOut: {
        type: Number,
        default: 0
    },
    harvestDate: {
        type: Date,
        required: function(){
            return ["crops", "fruits", "vegetables"].includes(this.category);
        }
    },
    expirationDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
      }],
    shippingWeight: {
        type: Number,
        required: [true, 'Product shipping weight is required'],
        min: 0
    },
    minOrderQuantity: {
        type: Number,
        required: [true, 'Product minimum order quantity is required'],
        default: 1
    },
    availableForBulk: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String],
        required: false,
        validate: {
            validator: (v: string[]) => v.length <= 5,
            message: "Product tags cannot exceed 5"
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isApproved: {
        type: Boolean,
        default: false // For admin approval
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    discountPercentage: {
        type: Number
    }, 
    discountExpiresAt: { type: Date, required: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Method to update average rating
productSchema.statics.updateAverageRating = async function (productId) {
    const reviews = await mongoose.model("Review").find({product : productId})
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    await this.findByIdAndUpdate(productId, {rating: averageRating});

}

// Method to update discount percentage
productSchema.statics.calculateDiscountPercentage = async function (productId) {
    const product = await this.findById(productId);
    if (product?.originalPrice && product?.discountPrice) {
        product.discountPercentage = Math.round(
            ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
        );
        await product.save();
        return product.discountPercentage;
    }
    return 0;
};

productSchema.statics.expireDiscounts = async function () {
    const now = new Date();
    await this.updateMany(
        { discountExpiresAt: {$lte: now} }, // Find expired discounts
        {
            $set: {discountPrice: "$originalPrice", discountPercentage: 0, discountExpiresAt: null},  // Reset fields
        }
        
    )
}

//ensuring expired product are unavailable 
// though has a concern in the sense the time of delivery too and when they want to consumed but will be looked into later

// productSchema.statics.expireProducts = async function () {
//     const now = new Date();
//     await this.updateMany(
//         { expirationDate: { $lte: now } },
//         { $set: { isAvailable: false } }
//     );
// };

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;