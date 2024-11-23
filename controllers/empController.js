import mongoose from "mongoose";
import Employees from "../models/EmpModel.js";
import User from "../models/UserModel.js";
import Department from "../models/DepartmentModel.js";

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      emp_ID,
      dob,
      gender,
      marital_status,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).send({
        message: "Email already exists.",
      });
    }

    const depId = await Department.findById(department);
    const newUser = await User.create({ email, name, password, role });

    console.log(newUser);
    const newEmp = await Employees.create({
      userId: newUser._id,
      emp_ID,
      dob,
      gender,
      marital_status,
      designation,
      department,
      // department: depId._id,
      salary,
    });

    console.log(newEmp);

    return res.status(200).send({
      success: true,
      data: newEmp,
      message: "Employee added successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error adding employee",
      error: err.message,
    });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const empData = await Employees.find()
      .populate("userId", { password: 0 })
      .populate("department");

    res.status(200).send({
      success: true,
      message: "Employee are fetched successfully",
      data: empData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching employees",
      error: error.message,
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let fetchedData;
    fetchedData = await Employees.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    if (!fetchedData) {
      fetchedData = await Employees.find({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }
    return res.status(200).send({
      success: true,
      message: "Employee found successfully",
      data: fetchedData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Employee could not be found",
      error: error.message,
    });
  }
};

export const updateEmployeeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      dob,
      gender,
      marital_status,
      designation,
      department,
      salary,
      role,
    } = req.body;

    const employee = await Employees.findById(id);
    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Could not find employee",
      });
    }
    const user = await User.findById(employee.userId);
    console.log(user, employee, id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Could not find user",
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      employee.userId,
      { name },
      { new: true }
    );
    const updateEmployeeDetails = await Employees.findByIdAndUpdate(id, {
      dob,
      gender,
      marital_status,
      designation,
      department,
      salary,
    });

    if (!updateUser || !updateEmployeeDetails) {
      return res.status(404).send({
        success: false,
        message: "Could not find document",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Employee details updated",
      // data: { ...updateEmployeeDetails, ...updateUser },
    });
  } catch (error) {
    res.status(500).send({
      message: "Unable to update employee details",
      error: error.message,
    });
  }
};

export const fetchEmpByDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employees.find({ department: id })
      .populate("userId", { password: 0 })
      .populate("department");
    console.log(employees);
    if (!employees) {
      return res
        .status(404)
        .send({ success: false, message: "No employees found for department" });
    }
    return res.status(200).send({
      success: true,
      message: "Employees found for department",
      data: employees,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Employee could not be found by Department",
      error: error.message,
    });
  }
};
