import express from "express";
import { getItems, createItem } from "../controllers/item.js";

const itemRouter = express.Router();

// Handle GET requests to retrieve items
itemRouter.get("/", getItems);

// Handle POST requests to create a new item
itemRouter.post("/", createItem);

export default itemRouter;
