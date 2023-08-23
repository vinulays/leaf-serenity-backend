import { User } from "../models/userModel.js";

export const addItemToCart = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $push: {
          cart: {
            plant: req.body.plantId,
            quantity: req.body.quantity,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new Error("Error adding item to cart: " + error.message);
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.userId,
        "cart._id": req.params.cartItemId,
      },
      { $set: { "cart.$.quantity": req.body.quantity } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    throw new Error("Error updating cart item quantity: " + error.message);
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { cart: { _id: req.params.cartItemId } } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    throw new Error("Error removing cart item: " + error.message);
  }
};
