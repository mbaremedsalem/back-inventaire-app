
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    nomutilisateur: { type: String, required: true, unique: true },
    motdepasse: { type: String, required: true },
    role: {
      type: String,
      enum: ["Administrateur", "Utilisateur"],
      default: "Utilisateur"
    },

    // 🔴 AJOUT ICI
    ordinateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product" // ⚠️ mets le bon nom de ton modèle Ordinateur
    }

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
