import express from "express";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getAllDepartments,
  getDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", getAllDepartments);
router.post("/addDepartment", addDepartment);
router.delete("/:id", deleteDepartment);
router.get("/:id", getDepartment);
router.put("/:id", editDepartment);

export default router;
