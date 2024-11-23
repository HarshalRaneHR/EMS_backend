import express from "express";
import {
  addLeave,
  getLeavesDetaills,
  getAllLeaves,
  getSingleLeaveDetail,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/add", addLeave);
router.get("/:id", getLeavesDetaills);
router.get("/", getAllLeaves);
router.get("/admin/:id", getSingleLeaveDetail);
router.put("/admin/:id", updateLeaveStatus);

export default router;
