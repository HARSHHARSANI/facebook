import userModel from "../models/userModel.js";
import {
  validateEmail,
  validateUsername,
  validatelength,
} from "../helpers/validation.js";
import bcrypt from "bcrypt";
import generateTokens from "../helpers/tokens.js";
import { sendVerificationEmail } from "../helpers/mailer.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
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
    // console.log(emailVerificationToken);
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateTokens({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success ! Please activate Your Email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

export const activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    // console.log(token);
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    const check = await userModel.findById(user.id);
    if (check.verified === true) {
      return res.status(400).send({
        message: "This email is already activated",
      });
    } else {
      await userModel.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).send({
        message: "Account Has been activated Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found || Email Not Found",
      });
    }
    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(400).send({
        success: false,
        message: "Invalid Creadentials...please try Again",
      });
    }

    const token = generateTokens({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Login Success!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};
