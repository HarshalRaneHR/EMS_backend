import mongoose, { Schema } from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
    },
    deductions: {
      type: Number,
    },
    netSalary: {
      type: Number,
    },
    payDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;