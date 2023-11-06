import userModel from "../models/userModel.js";
import {
  validateEmail,
  validateUsername,
  validatelength,
} from "../helpers/validation.js";
import bcrypt from "bcrypt";
import generateTokens from "../helpers/tokens.js";

export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Address",
      });
    }

    if (!validatelength(first_name, 2, 30)) {
      return res.status(400).json({
        success: false,
        message: "first name Must be Between 2 and 30",
      });
    }

    if (!validatelength(last_name, 2, 30)) {
      return res.status(400).json({
        success: false,
        message: "Last Name Must be Between 2 and 30",
      });
    }

    if (!validatelength(password, 6, 15)) {
      return res.status(400).json({
        success: false,
        message: "password Must be Between 6 and 15",
      });
    }

    const check = await userModel.findOne({ email });
    if (check) {
      return res.status(400).json({
        success: false,
        message:
          "This Email Address Already Exist Try With Another Email Address",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 3);
    // console.log(cryptedPassword);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new userModel({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateTokens(
      { id: user._id.toString() },
      "30m"
    );
    console.log(emailVerificationToken);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};
