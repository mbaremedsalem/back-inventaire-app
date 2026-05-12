import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  typeOrdinateur: { type: String },
  nom: { type: String, required: true },

  // Direction
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },

  // Agence
  fournisseur: { type: mongoose.Schema.Types.ObjectId, ref: "Fournisseur", required: true },

  date: { type: String, required: true },

  // 🔵 Nouvelles propriétés
  uniteCentrale: { type: String },
  adresseIP: { type: String },
  scanner: { type: String },
  processeur: { type: String },
  tailleDisqueDur: { type: String },
  ram: { type: String },
  systemeExploitation: { type: String },
  kaspersky: { type: String },
  etat: { type: String },
  dureeVie: { type: String },
  matriculeUtilisateur: { type: String },
  nomUtilisateur: { type: String },
  poste: { type: String },
  codeNature: { type: String },
  modele: { type: String },
  codeArticle: { type: String }

},
{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;