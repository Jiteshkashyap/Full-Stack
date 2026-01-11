import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {type: String,required: true,trim: true},
    category: {type: mongoose.Schema.Types.ObjectId,ref: "Category",required: true},
    subCategory: {type: mongoose.Schema.Types.ObjectId,ref: "SubCategory",required: true },
    brand: {type: String,trim: true},
    sku: {type: String,required: true,unique: true,uppercase: true},
    unit: {type: String,enum: ["kg", "gm", "liter", "pcs"],required: true,},
    images: [{url: { type: String },public_id: { type: String }}],
    description: {type: String},
    status: {type: Boolean,default: true},
  },

  { timestamps: true }
);

export const Product = mongoose.model("Product" , productSchema)
