import express from "express";
import { formAdd, formAddCharacter } from "../controllers/formController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/AddForm", verifyToken, formAdd);
router.post("/AddFormCharacter", verifyToken, formAddCharacter);

export default router;
