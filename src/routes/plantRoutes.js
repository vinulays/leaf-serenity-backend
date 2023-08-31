import {
  createPlant,
  getAllPlants,
  getPlantById,
} from "../controllers/plantController.js";
import { protect } from "../middleware/authMiddleware.js";

const routes = (app) => {
  app.get("/api/v1/plants", getAllPlants);
  app.post("/api/v1/plants", createPlant);
  app.get("/api/v1/plants/:plantId", getPlantById);
};

export default routes;
