import Transaction from "../models/Transaction.js";
import { logError, logInfo } from "../util/logging.js";

export const createTransaction = async (req, res) => {
  try {
    const { startDate, endDate, price, renterId, borrowerId } = req.body;
    const { itemId } = req.params;
    logInfo(req.body);

    const transaction = new Transaction({
      startDate,
      endDate,
      totalPrice: price,
      item_id: itemId,
      renter_id: renterId,
      borrower_id: borrowerId,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    logError("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
