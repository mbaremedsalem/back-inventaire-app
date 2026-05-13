import express from "express";
import Telephone from "../models/TelephoneTable.js";

const router = express.Router();

// ==========================
// GET ALL
// ==========================
router.get("/", async (req, res) => {
  try {
    const data = await Telephone.find()
      .populate("direction")
      .populate("agence");

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ==========================
// GET BY ID
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const data = await Telephone.findById(req.params.id)
      .populate("direction")
      .populate("agence");

    if (!data) {
      return res.status(404).json({ message: "Téléphone introuvable" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ==========================
// CREATE
// ==========================
router.post("/", async (req, res) => {
  try {
    const newTelephone = new Telephone(req.body);
    const saved = await newTelephone.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur création téléphone" });
  }
});

// ==========================
// UPDATE
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Telephone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Téléphone introuvable" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur modification téléphone" });
  }
});

// ==========================
// DELETE
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Telephone.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression" });
  }
});

export default router;