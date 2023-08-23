import {
  addFavorite,
  removeFavorite,
} from "../controllers/favoritesController.js";

const routes = (app) => {
  app.post("/api/v1/users/:userId/favorites/add", addFavorite);
  app.delete("/api/v1/users/:userId/favorites/:favoriteId", removeFavorite);
};

export default routes;
