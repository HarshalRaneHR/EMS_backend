import Employees from "../models/EmpModel.js";
import Leaves from "../models/LeaveModel.js";

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, from, to, description } = req.body;

    const employeeId = await Employees.findOne({ userId });

    const newLeave = await Leaves.create({
      employeeId: employeeId._id,
      leaveType,
      from,
      to,
      description,
    });

    res.status(200).send({
      success: true,
      message: "Leave was add successfully",
      // error: error.message,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while adding leave",
      error: error.message,
    });
  }
};

export const getLeavesDetaills = async (req, res) => {
  const { id } = req.params;
  try {
    const employeeId = await Employees.findOne({ userId: id });

    const getEmpLeavesDetails = await Leaves.find({
      employeeId: employeeId ? employeeId._id : id,
    }).populate({
      path: "employeeId",
      populate: [
        {
          path: "userId",
          select: "name",
        },
        {
          path: "department",
        },
      ],
    });

    res.status(200).send({
      success: true,
      message: "Leave was add successfully",
      data: getEmpLeavesDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting leaves details",
      error: error.message,
    });
  }
};

export const getSingleLeaveDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const getEmpLeavesDetails = await Leaves.findById(id).populate({
      path: "employeeId",
      populate: [
        {
          path: "userId",
          select: "name",
        },
        {
          path: "department",
        },
      ],
    });

    res.status(200).send({
      success: true,
      message: "Leave was add successfully",
      data: getEmpLeavesDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting leaves detail",
      error: error.message,
    });
  }
};

export const getAllLeaves = async (req, res) => {
  try {
    const leavesDetails = await Leaves.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "userId",
          select: "name",
        },
        {
          path: "department",
        },
      ],
    });

    res.status(200).send({
      success: true,
      message: "Leaves fetched successfully",
      data: leavesDetails,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting all leaves details",
      error: error.message,
    });
  }
};

export const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const getEmpLeavesDetails = await Leaves.findByIdAndUpdate(id, { status });

    res.status(200).send({
      success: true,
      message: "Leave status is updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating leaves status",
      error: error.message,
    });
  }
};
