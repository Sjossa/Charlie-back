import express from "express";
import {
  formAdd,
  formAddCharacter,
  getCharactere,
} from "../controllers/formController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/AddForm", verifyToken, formAdd);
router.post("/AddFormCharacter", verifyToken, formAddCharacter);
router.get("/getCharactere", verifyToken, getCharactere);

export default router;
