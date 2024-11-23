import User from "../models/UserModel.js";

export const addUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "Email already exists",
      });
    }
    const userData = await User.create({ email, password, role, name });
    res.status(200).send({
      success: true,
      message: "Success",
      data: userData,
    });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).send({
      message: "Failed to create User",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password are required.",
      });
    }

    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(404).send({
        message: "User not found.",
      });
    }

    if (password !== userData.password) {
      return res.status(401).send({
        message: "Enter correct password",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User authenticated successfully.",
      data: userData,
    });
  } catch (error) {
    console.error("Error during User authentication:", error);
    res.status(500).send({
      message: "An error occurred during authentication.",
      error: error.message,
    });
  }
};
