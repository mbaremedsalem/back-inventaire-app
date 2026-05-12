import express from "express";
import Product from "../models/ProductTable.js";

const router = express.Router();

/**
 * GET - Liste des produits
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categorie")
      .populate("fournisseur");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * GET - Un produit par ID (pour la page Modifier)
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categorie")
      .populate("fournisseur");

    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération du produit" });
  }
});

/**
 * POST - Créer un produit
 */
router.post("/", async (req, res) => {
  try {

    const {
      typeOrdinateur,
      nom,
      categorie,
      fournisseur,
      date,

      uniteCentrale,
      adresseIP,
      scanner,
      processeur,
      tailleDisqueDur,
      ram,
      systemeExploitation,
      kaspersky,
      etat,
      dureeVie,
      matriculeUtilisateur,
      nomUtilisateur,
      poste,
      codeNature,
      modele,
      codeArticle

    } = req.body;

    const newProduct = new Product({
      typeOrdinateur,
      nom,
      categorie,
      fournisseur,
      date,

      uniteCentrale,
      adresseIP,
      scanner,
      processeur,
      tailleDisqueDur,
      ram,
      systemeExploitation,
      kaspersky,
      etat,
      dureeVie,
      matriculeUtilisateur,
      nomUtilisateur,
      poste,
      codeNature,
      modele,
      codeArticle

    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du produit" });

  }
});

/**
 * PUT - Modifier un produit
 */
router.put("/:id", async (req, res) => {
  try {

    const {
      typeOrdinateur,
      nom,
      categorie,
      fournisseur,
      date,

      uniteCentrale,
      adresseIP,
      scanner,
      processeur,
      tailleDisqueDur,
      ram,
      systemeExploitation,
      kaspersky,
      etat,
      dureeVie,
      matriculeUtilisateur,
      nomUtilisateur,
      poste,
      codeNature,
      modele,
      codeArticle

    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        typeOrdinateur,
        nom,
        categorie,
        fournisseur,
        date,

        uniteCentrale,
        adresseIP,
        scanner,
        processeur,
        tailleDisqueDur,
        ram,
        systemeExploitation,
        kaspersky,
        etat,
        dureeVie,
        matriculeUtilisateur,
        nomUtilisateur,
        poste,
        codeNature,
        modele,
        codeArticle

      },
      { new: true }
    );

    res.json(updatedProduct);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erreur modification produit" });

  }
});

/**
 * DELETE - Supprimer un produit
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});


export default router;