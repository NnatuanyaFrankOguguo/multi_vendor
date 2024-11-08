import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: './.env' });

// Construct MongoDB URI from environment variables
const mongoURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@e-mall.fwpky.mongodb.net/E-mall`;

export const ConnectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};
