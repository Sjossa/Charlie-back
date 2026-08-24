import express from "express";
import {
  connexion,
  inscription,
} from "../../controllers/connexionController.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/Inscription", inscription);
router.post("/Connexion", connexion);
router.get("/CheckToken", verifyToken, (req, res) => res.sendStatus(200));

export default router;
