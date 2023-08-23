import { Plant } from "../models/plantModel.js";

export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const createPlant = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    try {
      let plant = new Plant();
      plant.name = name;
      plant.description = description;
      plant.price = price;
      plant.image = image;

      const savedPlant = await plant.save();
      await res.status(200).json(savedPlant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {}
};

export const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findOne({
      _id: req.params.plantId,
    });

    plant
      ? res.status(200).json(plant)
      : res.status(404).json({
          message: "Plant not found",
        });
  } catch (error) {
    console.log(error);
  }
};
