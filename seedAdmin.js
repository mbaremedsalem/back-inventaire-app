import User from "./models/UserTable.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    const exists = await User.findOne({ email: "admin@aub.com" });

    if (!exists) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      await User.create({
        prenom: "Admin",
        nom: "AUB",
        email: "admin@aub.com",
        nomutilisateur: "admin",
        motdepasse: hashedPassword,
        role: "Administrateur"
      });

      console.log("✅ Admin créé avec succès");
    } else {
      console.log("ℹ️ Admin déjà existant");
    }

  } catch (error) {
    console.error("Erreur seed admin :", error);
  }
};

export default seedAdmin;