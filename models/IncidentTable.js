import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
{
  titre: { type: String, required: true },

  priorite: {
    type: String,
    enum: ["Faible", "Moyenne", "Critique"],
    required: true
  },

  // ✅ CORRECTION ICI
  ordinateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // 🔥 IMPORTANT
    required: true
  },

  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  nomutilisateur: {
    type: String,
    required: true
  },

  statut: {
    type: String,
    enum: ["Envoyé", "Ouvert", "Résolu"],
    default: "Envoyé"
  },

  description: { type: String, required: true }

}, { timestamps: true });

export default mongoose.model("Incident", incidentSchema);