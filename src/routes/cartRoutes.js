import {
  addItemToCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../controllers/cartController.js";

const routes = (app) => {
  app.post("/api/v1/users/:userId/cart/add", addItemToCart);
  app.put("/api/v1/users/:userId/cart/:cartItemId", updateCartItemQuantity);
  app.delete("/api/v1/users/:userId/cart/:cartItemId", removeCartItem);
};

export default routes;
