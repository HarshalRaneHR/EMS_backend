import Department from "../models/DepartmentModel.js";

export const getAllDepartments = async (req, res) => {
  try {
    const allDepartments = await Department.find();

    res.status(200).send({
      message: "Departments fetched successfully",
      data: allDepartments,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting departments",
      error: error.message,
    });
  }
};

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const department = await Department.create({
      dep_name,
      description,
    });

    res.status(200).send({
      message: "Departments created successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating department",
      error: error.message,
    });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await Department.findById({ _id: id });

    await deleteDep.deleteOne();
    res.status(200).send({
      message: "Department deleted",
      data: deleteDep,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting department",
      error: error.message,
    });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const getDepartment = await Department.findById(id);
    res.status(200).send({
      message: "Success",
      data: getDepartment,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting department",
      error: error.message,
    });
  }
};
export const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true }
    );
    res.status(200).send({
      message: "Department updated successfully",
      data: updatedDepartment,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error editing department",
      error: error.message,
    });
  }
};
