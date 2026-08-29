import { db } from "../config/database.js";

export async function formAdd(req, res) {
  const donneesDuFormulaire = req.body;
  console.log(donneesDuFormulaire);

  db.query(
    "INSERT INTO Form_Bot (title, form,id_Utilisateur) VALUES (?,?,?)",
    [req.body.titre, JSON.stringify(req.body.formulaire), req.user.userId],
    (er) => {
      if (er) {
        console.log(er);
      } else {
        res.json({ message: "Succès ! Le serveur a bien reçu ton bot." });
      }
    },
  );
}

export async function formAddCharacter(req, res) {
  const donneesDuFormulaire = req.body;
  console.log(donneesDuFormulaire);

  db.query(
    "INSERT INTO Form_Bot_Remplie (title, form,id_Utilisateur) VALUES (?,?,?)",
    [req.body.titre, JSON.stringify(req.body.formulaire), req.user.userId],
    (er) => {
      if (er) {
        console.log(er);
      } else {
        res.json({ message: "Succès ! Le serveur a bien reçu ton bot." });
      }
    },
  );
}

export async function formUpdate(req, res) {
  const donneesDuFormulaire = req.body;
  console.log(donneesDuFormulaire);

  db.query(
    "INSERT INTO Form_Bot (Title, Form) VALUES (?,?)",
    ["johnny", JSON.stringify(req.body.baseForm)],
    (er) => {
      if (er) {
        console.log(er);
      } else {
        res.json({ message: "Succès ! Le serveur a bien reçu ton bot." });
      }
    },
  );
}

export async function getCharactere(req, res) {
  try {
    const sql =
      "SELECT title,form from Form_Bot_Remplie WHERE id_Utilisateur = ?";

    db.query(sql, [req.user.userId], (err, result) => {
      if (err) {
        console.error("Erreur DB :", err);
        return res.status(500).json({ error: "Erreur base de données" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Utilisateur introuvable" });
      }

      const userCharacter = {
        forms: result
          .filter((row) => row.title !== null)
          .map((row) => ({
            title: row.title,
            form: row.form,
            id: row.id,
          })),
      };

      res.json({ userCharacter });
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ error: "Erreur serveur interne" });
  }
}
