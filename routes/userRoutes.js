import express from "express";
import User from "../models/UserTable.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// ==========================
// GET - liste utilisateurs
// ==========================
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .populate("ordinateur")
      .select("-motdepasse");

    res.json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ==========================
// GET - utilisateur par ID  ✅ AJOUTÉ
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("ordinateur")
      .select("-motdepasse");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);

  } catch (error) {
    console.error("GET USER ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ==========================
// POST - créer utilisateur
// ==========================
router.post("/", async (req, res) => {
  try {
    const { prenom, nom, email, motdepasse, role, ordinateur } = req.body;

    const nomutilisateur = email.split("@")[0];

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const existingUsername = await User.findOne({ nomutilisateur });
    if (existingUsername) {
      return res.status(400).json({ message: "Nom utilisateur déjà utilisé" });
    }

    if (ordinateur) {
      const existingPC = await User.findOne({ ordinateur });
      if (existingPC) {
        return res.status(400).json({ message: "Cet ordinateur est déjà attribué" });
      }
    }

    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const user = new User({
      prenom,
      nom,
      email,
      nomutilisateur,
      motdepasse: hashedPassword,
      role,
      ordinateur
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "Utilisateur créé",
      user: savedUser
    });

  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ==========================
// PUT - modifier utilisateur
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const { prenom, nom, email, motdepasse, role, ordinateur } = req.body;

    const nomutilisateur = email.split("@")[0];

    let updateData = {
      prenom,
      nom,
      email,
      role,
      ordinateur,
      nomutilisateur
    };

    if (motdepasse) {
      updateData.motdepasse = await bcrypt.hash(motdepasse, 10);
    }

    if (ordinateur) {
      const existingPC = await User.findOne({
        ordinateur,
        _id: { $ne: req.params.id }
      });

      if (existingPC) {
        return res.status(400).json({ message: "Cet ordinateur est déjà attribué" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("ordinateur")
      .select("-motdepasse");

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(updatedUser);

  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ==========================
// DELETE
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, motdepasse } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    res.json({
      message: "Connexion réussie",
      user
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;