import express from "express";
import { formAdd } from "../../controllers/formController.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/AddForm", verifyToken, formAdd);

export default router;
