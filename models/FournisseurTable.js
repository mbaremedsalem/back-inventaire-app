import mongoose from "mongoose";

const fournisseurSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true, trim: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    adresse: { type: String, required: true },
  },
  { timestamps: true }
);

const Fournisseur = mongoose.model("Fournisseur", fournisseurSchema);
export default Fournisseur;