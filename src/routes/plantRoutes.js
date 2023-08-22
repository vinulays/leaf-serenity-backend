import {
  createPlant,
  getAllPlants,
  getPlantById,
} from "../controllers/plantControllers.js";

const routes = (app) => {
  app.get("/api/v1/plants", getAllPlants);
  app.post("/api/v1/plants", createPlant);
  app.get("/api/v1/plants/:plantId", getPlantById);
};

export default routes;
