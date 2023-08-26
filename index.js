import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/conn.js";
import pkg from "mongoose";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import plantRoutes from "./src/routes/plantRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import favoriteRoutes from "./src/routes/favoriteRoutes.js";
import bodyParser from "body-parser";

const { connection } = pkg;
dotenv.config();
const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();

userRoutes(app);
plantRoutes(app);
cartRoutes(app);
favoriteRoutes(app);

// Connecting to MongoDB using mongoose
connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("🔗 Successfully Connected to MongoDB");
    console.log(`✅ Application running on port: ${PORT}`);
  });
});
connection.on("error", (err) => {
  console.log(err);
});
