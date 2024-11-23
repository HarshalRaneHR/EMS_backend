import Employees from "../models/EmpModel.js";
import Leaves from "../models/LeaveModel.js";
import Department from "../models/DepartmentModel.js";

export const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employees.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalSalary = await Employees.aggregate([
      {
        $group: { _id: null, totalSalary: { $sum: "$salary" } },
      },
    ]);
    const employeesAppliedForLeave = await Leaves.distinct("employeeId");

    const leaveStatus = await Leaves.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const leaveSummary = {
      appliedFor: employeesAppliedForLeave.length,
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };
    console.log(
      totalEmployees,
      totalDepartments,
      totalSalary[0]?.totalSalary || 0,
      leaveSummary
    );
    return res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: {
        totalEmployees,
        totalDepartments,
        totalSalary: totalSalary[0]?.totalSalary || 0,
        leaveSummary,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching Summaries",
      error: error.message,
    });
  }
};
