import express from "express";
import { getItems } from "../controllers/item.js";

const itemRouter = express.Router();

// Handle GET requests to the root path ("/")
itemRouter.get("/", getItems);

export default itemRouter;
