import { addFavorite } from "../controllers/favoritesController.js";

const routes = (app) => {
  app.post("/api/v1/users/:userId/favorites/add", addFavorite);
};

export default routes;
