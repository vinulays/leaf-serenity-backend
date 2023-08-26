import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      //   Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //  Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token found" });
  }
};
