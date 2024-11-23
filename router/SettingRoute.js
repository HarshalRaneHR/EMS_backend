import express from "express";
import { changPassword } from "../controllers/settingController.js";

const router = express.Router();

router.put("/changePassword", changPassword);

export default router;
