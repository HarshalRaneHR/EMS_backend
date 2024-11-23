import express from "express";
import mongoose, { Schema } from "mongoose";

const EmpModel = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emp_ID: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    marital_status: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Employees = mongoose.model("Employees", EmpModel);

export default Employees;
