import express from "express";
import { createTransaction } from "../controllers/transaction.js";

const transactionRouter = express.Router();

transactionRouter.post("/rentPage/:itemId", createTransaction);

export default transactionRouter;
