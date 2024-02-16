import express from "express";
import {
  createTransaction,
  getUnavailableDates,
} from "../controllers/transaction.js";

const transactionRouter = express.Router();

transactionRouter.post("/rentPage/:itemId", createTransaction);
transactionRouter.get("/rentPage/:itemId", getUnavailableDates);

export default transactionRouter;
