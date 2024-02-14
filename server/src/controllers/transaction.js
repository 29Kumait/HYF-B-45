import Transaction from "../models/Transaction.js";
import { logError } from "../util/logging.js";

export const createTransaction = async (req, res) => {
  try {
    const { startDate, endDate, totalPrice, renterId } = req.body;
    const { itemId } = req.params;

    // Static borrower ID
    const STATIC_BORROWER_ID = "65c8aeb7f95558392ef74d9b";

    const transaction = new Transaction({
      startDate,
      endDate,
      totalPrice,
      item_id: itemId,
      renter_id: renterId,
      borrower_id: STATIC_BORROWER_ID,
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    logError("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
