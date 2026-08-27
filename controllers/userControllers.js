import { db } from "../config/database.js";

export async function meDonnée(req, res) {
  try {
    const sql =
      "SELECT users.email, users.pseudo, Form_Bot.title, Form_Bot.form ,Form_Bot.id FROM users LEFT JOIN Form_Bot ON users.id = Form_Bot.id_Utilisateur WHERE users.id = ? ;";

    db.query(sql, [req.user.userId], (err, result) => {
      if (err) {
        console.error("Erreur DB :", err);
        return res.status(500).json({ error: "Erreur base de données" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Utilisateur introuvable" });
      }

      const userData = {
        email: result[0].email,
        pseudo: result[0].pseudo,
        forms: result
          .filter((row) => row.title !== null)
          .map((row) => ({
            title: row.title,
            form: row.form,
            id: row.id,
          })),
      };

      console.log(userData);

      res.json({ user: userData });
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ error: "Erreur serveur interne" });
  }
}
