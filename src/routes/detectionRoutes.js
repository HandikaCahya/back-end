import express from "express";

import {
  detectStroke,
  getHistory
} from "../controllers/detectionController.js";

import { upload } from "../middleware/upload.js";

import {
  detectionValidation
} from "../middleware/validations/detectionValidation.js";

import { validate } from "../middleware/validate.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  detectionValidation,
  validate,
  detectStroke
);

router.get(
  "/history",
  verifyToken,
  getHistory
);

export default router;