import User from "../models/UserModel.js";

export const changPassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const getUser = await User.findById(userId);

    if (!getUser) {
      return res.status(404).send({
        success: true,
        message: "User not found",
      });
    }

    console.log(getUser, getUser.password !== oldPassword);
    if (getUser.password !== oldPassword) {
      return res.status(500).send({
        success: true,
        message: "Old password is incorrect",
      });
    }
    const user = await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });
    console.log(getUser);
    return res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error changing password",
      error: error.message,
    });
  }
};
