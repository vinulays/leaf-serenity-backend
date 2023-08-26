import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    city,
    state,
    street,
    country,
    zip,
    role,
  } = req.body;

  // Hashing password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    let user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = hashedPassword;
    user.city = city;
    user.state = state;
    user.street = street;
    user.country = country;
    user.zip = zip;
    user.role = role;

    const savedUser = await user.save();

    await res.status(200).json({
      _id: savedUser.id,
      firstname: savedUser.firstname,
      email: savedUser.email,
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    console.log(req.body);
    console.log(error);
    if (error.message.includes("E11000 duplicate key error")) {
      res.status(409).json({
        error:
          "The provided email is already associated with another Provider.",
      });
    } else res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    user &&
      ((await bcrypt.compare(password, user.password))
        ? await res.status(200).json({
            user,
            userToken: generateToken(user._id),
          })
        : res.status(401).json({ error: "Incorrect password" }));

    !user && res.status(404).json({ error: "User not found" });
  } catch (error) {}
};

export const getUserbyId = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId,
    })
      .populate({
        path: "cart.plant",
        model: "plant",
      })
      .populate({
        path: "favorites",
        model: "plant",
      })
      .exec();

    user
      ? res.status(200).json(user)
      : res.status(404).json({
          message: "User not found",
        });
  } catch (error) {
    console.log(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
