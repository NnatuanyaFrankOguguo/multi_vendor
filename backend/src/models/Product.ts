import mongoose, {Document, Schema, Types} from "mongoose";

//Product review interface
export interface IProduct extends Document {
    name: string;
    description: string;
    category: string; //Enables filtering/sorting
    discountPrice?: number;
    originalPrice: number;
    // currency: string;
    unit?: string;
    stock: number;
    highlights?: string;
    storeInfo: Types.ObjectId; // Reference to Store model
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
    minOrderQuantity?: number;
    isAvailable?: boolean;
    isApproved?: boolean;
    //discount?: { percentage: number; expiresAt: Date };
    rating?: number; //Average rating from product Reviews then calculate it below and add here
    discountPercentage?: number;
    discountExpiresAt?: Date;
    

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
    highlights: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    discountPrice: {
        type: Number
    },
    originalPrice: {
        type: Number,
        required: [true, 'Product\'s real price is required'],
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
    storeInfo: {
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
        type: Number,
        default: 0
    }, 
    discountExpiresAt: { type: Date, required: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

productSchema.pre("save", async function (next) {
    // Ensure `this` is the product document
    const product = this as IProduct;

    const now = new Date();

    // 1️⃣ Calculate Discount Percentage Before Saving
    if (product.originalPrice && product.discountPrice) {
        product.discountPercentage = Math.round(
            ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
        );
    } else {
        product.discountPercentage = 0;
    }

    // 2️⃣ Update Average Rating Before Saving
    if (product.isModified("reviews")) { // Only update if `reviews` array changes
        const reviews = await mongoose.model("Review").find({ product: product._id });
        // Calculate the total rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

        // Calculate the average rating
        let avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    
        // Apply scaling to ensure the minimum rating is 3.5
        product.rating = 3.5 + (avgRating * 1.5 / 5);

        // Ensure it doesn't exceed 5
        if (product.rating > 5) {
            product.rating = 5;
        }
    }


    // 3️⃣ Reset Expired Discounts Before Saving
    if (product.discountExpiresAt && product.discountExpiresAt <= now) {
        product.discountPrice = undefined; // Reset discount
        product.discountPercentage = 0;
        product.discountExpiresAt = undefined; // Remove expiration date
    }


    next(); // Move to the next middleware
});


// productSchema.statics.expireDiscounts = async function () {
//     const now = new Date();
//     await this.updateMany(
//         { discountExpiresAt: {$lte: now} }, // Find expired discounts
//         {
//             $set: {discountPrice: "$originalPrice", discountPercentage: 0, discountExpiresAt: null},  // Reset fields
//         }
        
//     )
// }

//ensuring expired product are unavailable 
// though has a concern in the sense the time of delivery too and when they want to consumed but will be looked into later

// productSchema.statics.expireProducts = async function () {
//     const now = new Date();
//     await this.updateMany(
//         { expirationDate: { $lte: now } },
//         { $set: { isAvailable: false } }
//     );
// };

const Product = mongoose.model<IProduct>("products", productSchema);
export default Product;