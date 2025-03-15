import mongoose from "mongoose";
// Import models
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your event product name!"],
    },
    description: {
        type: String,
        required: [true, "Please enter your event product description!"],
    },
    category: {
        type: String,
        required: [true, "Please enter your event product category!"],
    },
    start_Date: {
        type: Date,
        required: false,
    },
    end_Date: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        default: "Running",
    },
    tags: {
        type: String,
    },
    originalPrice: {
        type: Number,
    },
    highlights: {
        type: String,
    },
    discountPrice: {
        type: Number,
        required: [true, "Please enter your event product price!"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter your event product stock!"],
    },
    images: {
        type: [String],
        validate: {
            validator: (v) => v.length <= 5,
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
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});
const Event = mongoose.model("events", eventSchema);
export default Event;
