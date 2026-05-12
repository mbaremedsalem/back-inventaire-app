import express from "express";
import Fournisseur from "../models/FournisseurTable.js";

const router = express.Router();

// GET - liste des fournisseurs
router.get("/", async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.json(fournisseurs);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST - créer fournisseur (nom unique)
router.post("/", async (req, res) => {
  const { nom, telephone, email, adresse } = req.body;

  try {
    const exist = await Fournisseur.findOne({ nom });
    if (exist) {
      return res.status(400).json({ message: "Ce fournisseur existe déjà" });
    }

    const newFournisseur = new Fournisseur({ nom, telephone, email, adresse });
    const saved = await newFournisseur.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET - Un fournisseur par ID
router.get("/:id", async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);

    if (!fournisseur) {
      return res.status(404).json({ message: "Fournisseur introuvable" });
    }

    res.json(fournisseur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// PUT - modifier une catégorie
router.put("/:id", async (req, res) => {
  try {
    const { nom, telephone, email, adresse } = req.body;

    const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
      req.params.id,
      { nom, telephone, email, adresse },
      { new: true } // retourne la nouvelle valeur
    );

    if (!updatedFournisseur) {
      return res.status(404).json({ message: "Fournisseur non trouvée" });
    }

    res.json(updatedFournisseur);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// DELETE - supprimer une catégorie
router.delete("/:id", async (req, res) => {
  try {
    const deletedFournisseur = await Fournisseur.findByIdAndDelete(req.params.id);

    if (!deletedFournisseur) {
      return res.status(404).json({ message: "Fournisseur non trouvée" });
    }

    res.json({ message: "Fournisseur supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});



export default router;