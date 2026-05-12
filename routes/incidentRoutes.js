import express from "express";
import Incident from "../models/IncidentTable.js";
import User from "../models/UserTable.js";

const router = express.Router();


// ==========================
// GET ALL INCIDENTS
// ==========================
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("ordinateur")
      .populate("utilisateur");

    res.json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// ==========================
// GET INCIDENT BY ID
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("ordinateur")
      .populate("utilisateur");

    if (!incident) {
      return res.status(404).json({ message: "Incident introuvable" });
    }

    res.json(incident);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// ==========================
// CREATE INCIDENT ✅ CORRIGÉ
// ==========================
router.post("/", async (req, res) => {
  try {
    const { titre, priorite, description, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Utilisateur requis" });
    }

    // 🔥 récupérer utilisateur depuis DB
    const user = await User.findById(userId).populate("ordinateur");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    if (!user.ordinateur) {
      return res.status(400).json({ message: "Aucun ordinateur associé à cet utilisateur" });
    }

    const incident = new Incident({
      titre,
      priorite,
      description,

      utilisateur: user._id,
      ordinateur: user.ordinateur._id,

      // ✅ NOM + PRENOM automatique
      nomutilisateur: `${user.prenom} ${user.nom}`,

      statut: "Envoyé"
    });

    const saved = await incident.save();

    res.status(201).json(saved);

  } catch (error) {
    console.error("CREATE INCIDENT ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// ==========================
// UPDATE
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// ==========================
// DELETE
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Incident.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;