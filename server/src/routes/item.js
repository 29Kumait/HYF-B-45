import express from "express";
import { getItems, createItem } from "../controllers/item.js";
import { getItemAndUserDataById } from "../controllers/getItemAndUserDataById.js";
import { searchItems } from "../controllers/item.js";

const itemRouter = express.Router();

// Handle GET requests to retrieve items
itemRouter.get("/", getItems);

// Handle POST requests to create a new item
itemRouter.post("/", createItem);

// Handle GET requests to retrieve a single item by its ID
itemRouter.get("/:itemId", getItemAndUserDataById);

// Add a new route for searching items
itemRouter.get("/search", searchItems);

export default itemRouter;
