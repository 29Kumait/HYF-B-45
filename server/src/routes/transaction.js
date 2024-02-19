import express from "express";
import {
  createTransaction,
  getUnavailableDates,
  getUserBorrowerTransactions,
} from "../controllers/transaction.js";

const transactionRouter = express.Router();

transactionRouter.post("/rentPage/:itemId", createTransaction);
transactionRouter.get("/rentPage/:itemId", getUnavailableDates);
transactionRouter.get("/:userId", getUserBorrowerTransactions);

export default transactionRouter;
