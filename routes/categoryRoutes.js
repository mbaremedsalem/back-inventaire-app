import express from "express";
import Category from "../models/CategoryTable.js";

const router = express.Router();


// GET - liste des catégories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// POST - ajouter une catégorie
router.post("/", async (req, res) => {
  const { nom, directeur, description } = req.body;

  try {
    // Vérifier si le nom existe déjà
    const existing = await Category.findOne({ nom });
    if (existing) {
      return res.status(400).json({ message: "Une catégorie avec ce nom existe déjà" });
    }

    const category = new Category({ nom, directeur, description });
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// GET - Une catégorie par ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// PUT - modifier une catégorie
router.put("/:id", async (req, res) => {
  try {
    const { nom, directeur, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { nom, directeur, description },
      { new: true } // retourne la nouvelle valeur
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// DELETE - supprimer une catégorie
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});




export default router;