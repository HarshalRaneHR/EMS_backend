import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
    },
    leaveType: {
      type: String,
      required: true,
      enum: ["Sick leave", "Casual leave", "Annual leave"],
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Rejected", "Approved"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Leaves = mongoose.model("Leaves", leaveSchema);

export default Leaves;
