import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import 'dotenv/config';
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'First name is required'],
        minlength: 2,
        maxlength: 20
    },
    lname: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,
        select: false // Do not return password in response
    },
    phoneNumber: {
        type: Number,
        required: false,
        minlength: 10,
        maxlength: 15
    },
    address: [
        {
            address1: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: false,
            },
            state: {
                type: String,
                required: false,
            },
            country: {
                type: String,
                required: false,
            },
            zipCode: {
                type: Number,
                required: false,
            }
        }
    ],
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
}, { timestamps: true });
userSchema.pre("save", function (next) {
    if (this.isModified("email")) {
        this.email = this.email.toLowerCase();
    }
    next();
});
// Hash password before saving to database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrpyt.genSalt(10);
    user.password = await bcrpyt.hash(user.password, salt);
    next();
});
/*writing the generate token function */
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_SECRET_EXPIRATION });
};
// compare password 
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrpyt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
