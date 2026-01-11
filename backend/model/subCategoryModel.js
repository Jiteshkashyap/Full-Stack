import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    category: {type: mongoose.Schema.Types.ObjectId,ref: "Category",required: true},
    name: {type: String,required: true,trim: true},
    status: {type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SubCategory = mongoose.model('SubCategory', subCategorySchema)