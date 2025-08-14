import express from "express";
import { validateAdhar_Pan } from "../controllers/validate.controller.js";

const router = express.Router();

router.post("/", validateAdhar_Pan);

export default router;