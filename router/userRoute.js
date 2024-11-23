import express from "express";
import { addUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/addUser", addUser);
router.post("/getUser", getUser);

export default router;
