import { User } from "../models/userModel.js";

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

  try {
    let user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.city = city;
    user.state = state;
    user.street = street;
    user.country = country;
    user.zip = zip;
    user.role = role;

    const savedUser = await user.save();

    await res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    if (err.message.includes("E11000 duplicate key error")) {
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
      (user.password === password
        ? await res.status(200).json(user)
        : res.status(401).json({ error: "Incorrect password" }));

    !user && res.status(404).json({ error: "User not found" });
  } catch (error) {}
};

export const getUserbyId = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId,
    });

    user
      ? res.status(200).json(user)
      : res.status(404).json({
          message: "User not found",
        });
  } catch (error) {
    console.log(error);
  }
};
