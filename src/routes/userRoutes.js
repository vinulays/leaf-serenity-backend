import {
  createUser,
  getUserbyId,
  userLogin,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const routes = (app) => {
  app.get("/api/v1/users/:userId", protect, getUserbyId);
  app.post("/api/v1/register", createUser);
  app.post("/api/v1/login", userLogin);
};

export default routes;
