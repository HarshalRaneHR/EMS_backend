import Employees from "../models/EmpModel.js";
import Salary from "../models/SalaryModel.js";

export const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    const newSalary = await Salary.create({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      payDate,
      netSalary: totalSalary,
    });
    if (!newSalary) {
      return res.status(404).send({
        success: false,
        message: "Error adding salary to employee",
      });
    }
    console.log(newSalary);
    return res.status(200).send({
      success: true,
      data: newSalary,
      message: "Salary added successfully",
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error adding salary to employee",
    });
  }
};

export const fetchSalaryByEmpID = async (req, res) => {
  try {
    const { id } = req.params;
    let getSalaryByEmpID = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      ["employeeId", "emp_ID"]
    );
    return res
      .status(200)
      .send({ success: true, message: "Salary found", data: getSalaryByEmpID });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Salary not found",
      error: error.message,
    });
  }
};

export const fetchSalaryByUserID = async (req, res) => {
  try {
    const { id } = req.params;

    const emp = await Employees.findOne({ userId: id });

    const getSalaryByUserID = await Salary.find({
      employeeId: emp._id,
    }).populate("employeeId", ["employeeId", "emp_ID"]);

    return res.status(200).send({
      success: true,
      message: "Salary found",
      data: getSalaryByUserID,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Salary not found",
      error: error.message,
    });
  }
};
