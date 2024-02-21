import { response } from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return console.log(error);
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists! Login Instead" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found Signup First" });
    }
    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    console.log(error);
  }
};
