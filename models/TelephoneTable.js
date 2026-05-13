import mongoose from "mongoose";

const telephoneSchema = new mongoose.Schema(
{
  numero: { type: String, required: true },

  modele: { type: String, required: true },

  direction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  agence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
    required: true
  },

  adresseIP: { type: String },
  etat: { type: String },
  nomUtilisateur: { type: String },
  poste: { type: String },
  codeNature: { type: String },
  codeArticle: { type: String }

},
{ timestamps: true }
);

export default mongoose.model("Telephone", telephoneSchema);