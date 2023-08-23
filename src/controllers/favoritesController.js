import { User } from "../models/userModel.js";

export const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favorites.includes(req.body.plantId)) {
      return res.status(400).json({ message: "Plant already in favorites" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $addToSet: {
          favorites: req.body.plantId,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
