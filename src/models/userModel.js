import mongoose from "mongoose";
import { cartItemSchema } from "./cartItemModel.js";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  street: { type: String },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  role: { type: String, required: true },
  cart: { type: [cartItemSchema], required: false },
});

export const User = mongoose.model("user", userSchema);
