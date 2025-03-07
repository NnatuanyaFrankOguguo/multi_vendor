import mongoose, {Document, Schema, Types} from "mongoose";


// Define an interface representing a User document in MongoDB

export interface IEvent extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    category: string;
    start_Date: Date;
    Finish_Date: Date;
    store: Object;
    storeId: string;
    status: string;
    tags?: string;
    originalPrice: number;
    discountPrice: number;
    stock: number;
}

// Import models

const eventSchema = new mongoose.Schema({
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
        required: true,
      },
      Finish_Date: {
        type: Date,
        required: true,
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
    discountPrice:{
        type: Number,
        required: [true,"Please enter your event product price!"],
    },
    stock:{
        type: Number,
        required: [true,"Please enter your event product stock!"],
    },
    images:[
        {
            public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
        },
    ],
    storeId:{
        type: String,
        required: true,
    },
    store:{
        type: Object,
        required: true,
    },
    sold_out:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Event", eventSchema);