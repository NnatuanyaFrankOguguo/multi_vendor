import mongoose, {Document, Schema, Types} from "mongoose";


// Define an interface representing a User document in MongoDB

export interface IEvent extends Document {
    name: string;
    description: string;
    category: string;
    start_Date?: Date;
    end_Date?: Date;
    storeInfo: Types.ObjectId; // Reference to Store model;
    images: string[];
    status?: string;
    tags?: string;
    soldOut?: number;
    originalPrice: number;
    discountPrice: number;
    highlights?: string;
    stock: number;
    createdAt: Date;
}

// Import models

const eventSchema: Schema<IEvent> = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your event product name!"],
    },
    description:{
        type: String,
        required:[true,"Please enter your event product description!"],
    },
    category:{
        type: String,
        required:[true,"Please enter your event product category!"],
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
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    highlights:{
        type: String,   

    },
    discountPrice:{
        type: Number,
        required: [true,"Please enter your event product price!"],
    },
    stock:{
        type: Number,
        required: [true,"Please enter your event product stock!"],
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
    soldOut:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

const Event = mongoose.model<IEvent>("events", eventSchema);
export default Event;