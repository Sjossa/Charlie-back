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
