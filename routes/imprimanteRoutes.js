import express from "express";
import Imprimante from "../models/ImprimanteTable.js";

const router = express.Router();

/**
 * ==========================
 * GET - Liste des imprimantes
 * ==========================
 */
router.get("/", async (req, res) => {
  try {
    const imprimantes = await Imprimante.find()
      .populate("direction")
      .populate("agence");

    res.json(imprimantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * ==========================
 * GET - Une imprimante par ID
 * ==========================
 */
router.get("/:id", async (req, res) => {
  try {
    const imprimante = await Imprimante.findById(req.params.id)
      .populate("direction")
      .populate("agence");

    if (!imprimante) {
      return res.status(404).json({ message: "Imprimante introuvable" });
    }

    res.json(imprimante);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération" });
  }
});

/**
 * ==========================
 * POST - Créer une imprimante
 * ==========================
 */
router.post("/", async (req, res) => {
  try {
    const {
      modele,
      direction,
      agence,
      adresseIP,
      etat,
      nomUtilisateur,
      poste,
      codeNature,
      codeArticle
    } = req.body;

    const newImprimante = new Imprimante({
      modele,
      direction,
      agence,
      adresseIP,
      etat,
      nomUtilisateur,
      poste,
      codeNature,
      codeArticle
    });

    const saved = await newImprimante.save();

    res.status(201).json(saved);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur création imprimante" });
  }
});

/**
 * ==========================
 * PUT - Modifier une imprimante
 * ==========================
 */
router.put("/:id", async (req, res) => {
  try {
    const {
      modele,
      direction,
      agence,
      adresseIP,
      etat,
      nomUtilisateur,
      poste,
      codeNature,
      codeArticle
    } = req.body;

    const updated = await Imprimante.findByIdAndUpdate(
      req.params.id,
      {
        modele,
        direction,
        agence,
        adresseIP,
        etat,
        nomUtilisateur,
        poste,
        codeNature,
        codeArticle
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Imprimante introuvable" });
    }

    res.json(updated);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur modification imprimante" });
  }
});

/**
 * ==========================
 * DELETE - Supprimer
 * ==========================
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Imprimante.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Imprimante introuvable" });
    }

    res.json({ message: "Imprimante supprimée avec succès" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur suppression" });
  }
});

export default router;