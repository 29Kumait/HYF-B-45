import Transaction from "../models/Transaction.js";
import { logError, logInfo } from "../util/logging.js";

export const createTransaction = async (req, res) => {
  try {
    const { startDate, endDate, price, renterId } = req.body;
    const { itemId } = req.params;
    logInfo(req.body);

    // Static borrower ID
    const STATIC_BORROWER_ID = "65c8aeb7f95558392ef74d9b";

    const transaction = new Transaction({
      startDate,
      endDate,
      totalPrice: price,
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
