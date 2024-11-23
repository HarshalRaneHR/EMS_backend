import express from "express";
import {
  addSalary,
  fetchSalaryByEmpID,
  fetchSalaryByUserID,
} from "../controllers/salaryController.js";

const router = express.Router();

router.post("/add", addSalary);
router.get("/:id", fetchSalaryByEmpID);
router.get("/employee/:id", fetchSalaryByUserID);

export default router;
