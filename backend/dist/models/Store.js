import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import 'dotenv/config';
const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Store name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password should be greater than 6 characters"],
        select: false // Do not return password in response
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Seller'
    },
    withdrawMethod: {
        provider: String,
        accountNumber: String,
    },
    availableBalance: {
        type: Number,
        default: 0,
        min: [0, "Balance cannot be negative"]
    },
    transactions: [
        {
            amount: {
                type: Number,
                required: true,
            },
            type: {
                type: String,
                required: true,
                enum: ['sale', 'withdraw'],
            },
            status: {
                type: String,
                default: 'Processing',
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            updatedAt: {
                type: Date,
            }
        }
    ],
    avatar: {
        type: String,
        required: true,
        default: "https://example.com/default-avatar.png", // Default avatar
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    businessRegNum: {
        type: String,
    },
    taxId: {
        type: String,
    },
    certifications: {
        type: [String],
        default: [], // e.g., ["USDA Organic", "Fair Trade"]
    },
    rating: {
        type: Number,
        default: 0,
        min: [1, "Rating cannot be negative"],
        max: [5, "Rating cannot be more than 5"]
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: [1, "Rating cannot be negative"],
                max: [5, "Rating cannot be more than 5"]
            },
            comment: {
                type: String,
                required: true,
                minlength: 10
            },
            images: [String], // URLs of review images
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
            },
        },
    ],
    totalRatings: {
        type: Number,
        default: 0,
        min: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
}, { timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
// Automatically calculate rating and total reviews
storeSchema.pre("save", function (next) {
    if (this.isModified("reviews")) {
        const total = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.totalRatings = total;
        this.totalReviews = this.reviews.length;
        this.rating = this.totalReviews > 0 ? total / this.totalReviews : 0;
    }
    next();
});
// Pre-save hook to make email lowercase before saving to database
storeSchema.pre("save", function (next) {
    if (this.isModified("email")) {
        this.email = this.email.toLowerCase();
    }
    next();
});
// Hash password before saving to database
/*writing the generate token function */
storeSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_SECRET_EXPIRATION });
};
// compare password 
storeSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrpyt.compare(candidatePassword, this.password);
};
// Export the model and return your IUser interface
const Store = mongoose.model('Store', storeSchema);
export default Store;
