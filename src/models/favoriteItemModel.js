import mongoose, { model } from "mongoose";

export const favoriteItemSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
});

export default model("favoriteItem", favoriteItemSchema);
