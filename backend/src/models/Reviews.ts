import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId; // User who wrote the review
  product?: mongoose.Types.ObjectId; // Optional: Review for a product
  store?: mongoose.Types.ObjectId; // Optional: Review for a store
  rating: number;
  comment?: string;
  images?: string[];
}

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product" }, // Optional
  store: { type: Schema.Types.ObjectId, ref: "Store" }, // Optional
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 500 },
  images: [String],
}, { timestamps: true });

// Validate that review is linked to either product or store
reviewSchema.pre("save", function (next) {
    if (!this.product && !this.store) {
      return next(new Error("Review must be linked to a product or store"));
    }
    if (this.product && this.store) {
      return next(new Error("Review cannot be linked to both product and store"));
    }
    next();
  });

export default mongoose.model<IReview>("Review", reviewSchema);