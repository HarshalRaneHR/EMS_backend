import express from "express";
import {
  addEmployee,
  fetchEmpByDepartment,
  getAllEmployees,
  getEmployee,
  updateEmployeeDetails,
} from "../controllers/EmpController.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/addEmployee", addEmployee);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployeeDetails);
router.get("/department/:id", fetchEmpByDepartment);

export default router;
