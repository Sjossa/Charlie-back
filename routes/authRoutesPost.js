import express from "express";
import { connexion, inscription } from "../controllers/connexionController.js";
import { meDonnée } from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

//Post
router.post("/Inscription", inscription);
router.post("/Connexion", connexion);

//Get
router.get("/CheckToken", verifyToken, (req, res) => res.sendStatus(200));
router.get("/me", verifyToken, meDonnée);

export default router;
