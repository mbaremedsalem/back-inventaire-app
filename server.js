import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import fournisseurRoutes from "./routes/fournisseurRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js"; // ✅ AJOUT

import seedAdmin from "./SeedAdmin.js";

dotenv.config();

connectDB().then(() => {
  console.log("MongoDB connecté !");
  seedAdmin();
});

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ordinateurs", productRoutes);
app.use("/api/directions", categoryRoutes);
app.use("/api/agences", fournisseurRoutes);
app.use("/api/users", userRoutes);
app.use("/api/incidents", incidentRoutes); // ✅ AJOUT

app.get("/", (req, res) => {
  res.send("API fonctionne 🚀");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

/*app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur lancé sur http://0.0.0.0:${PORT}`);
});*/