import express from "express";
import mongoose from "mongoose";
import Employees from "./EmpModel.js";
import Leaves from "./LeaveModel.js";
import Salary from "./SalaryModel.js";
import User from "./UserModel.js";

const departmentSchema = new mongoose.Schema(
  {
    dep_name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timeStamp: true }
);

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employess = await Employees.find({ department: this._id });
      const userIds = employess.map((emp) => emp.userId);
      const empIds = employess.map((emp) => emp._id);
      await User.deleteMany({ _id: { $in: userIds } });
      await Employees.deleteMany({ department: this._id });
      await Leaves.deleteMany({ employeeId: { $in: empIds } });
      await Salary.deleteMany({ employeeId: { $in: empIds } });

      next();
    } catch (error) {
      next(error);
    }
  }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
