import mongoose, { model } from "mongoose";

export const cartItemSchema = mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  quantity: {
    type: Number,
    requred: true,
  },
});

export default model("cartItem", cartItemSchema);
