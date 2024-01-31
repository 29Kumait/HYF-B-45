import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getCategories } from "../controllers/category.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoryRouter = express.Router();

categoryRouter.use(
  "/assets/categories",
  express.static(
    path.join(__dirname, "..", "..", "client", "public", "assets", "categories")
  )
);

categoryRouter.get("/", getCategories);

export default categoryRouter;
