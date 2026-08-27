import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/database.js";

export async function inscription(req, res) {
  const { email, password, pseudo } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }

  try {
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);

    console.log("Mot de passe haché avec succès :", hash);

    const sql = "INSERT INTO users (email, password ,pseudo) VALUES (?, ?,?)";

    db.query(sql, [email, hash, pseudo], (err, result) => {
      if (err) {
        console.error("Erreur DB :", err);
        return res.status(500).json({ error: "Erreur lors de l'inscription" });
      }
      res.json({ message: "Utilisateur inscrit avec succès !" });
    });
  } catch (error) {
    console.error("Erreur lors du hachage :", error);
    res.status(500).json({ error: "Erreur serveur interne" });
  }
}

export async function connexion(req, res) {
  const { pseudo, password } = req.body;

  if (!pseudo || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis." });
  }

  const sql = "SELECT * FROM users WHERE pseudo = ?";

  db.query(sql, [pseudo], async (err, results) => {
    if (err) {
      console.error("Erreur DB :", err);
      return res.status(500).json({ error: "Erreur serveur interne." });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ error: "Email ou mot de passe incorrect." });
    }

    const user = results[0];

    try {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(401)
          .json({ error: "Pseudo ou mot de passe incorrect." });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Connexion réussie !",
      });
    } catch (error) {
      console.error("Erreur bcrypt :", error);
      res.status(500).json({ error: "Erreur serveur interne." });
    }
  });
}
