import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true },
    directeur: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
