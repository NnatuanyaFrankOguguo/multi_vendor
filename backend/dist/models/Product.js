import mongoose, { Schema } from "mongoose";
const productSchema = new mongoose.Schema({
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
            validator: (v) => v.length <= 5,
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
        required: function () {
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
            validator: (v) => v.length <= 5,
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
    discount: {
        percentage: Number,
        expiresAt: Date,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
const Product = mongoose.model("Product", productSchema);
export default Product;
