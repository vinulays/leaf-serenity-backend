import {
  createUser,
  getUserbyId,
  userLogin,
} from "../controllers/userControllers.js";

const routes = (app) => {
  app.get("api/v1/users/:userId", getUserbyId);
  app.post("api/v1/register", createUser);
  app.post("/api/v1/login", userLogin);
};

export default routes;
