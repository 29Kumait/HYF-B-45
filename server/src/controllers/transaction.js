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
    res.status(201).json({ success: true, result: transaction });
  } catch (error) {
    logError("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};

export const getUnavailableDates = async (req, res) => {
  try {
    const { itemId } = req.params;
    // to find all the transactions for this item-id
    const existingTransactions = await Transaction.find({ item_id: itemId });
    const unavailableDates = [];
    existingTransactions.forEach((transaction) => {
      const { startDate, endDate } = transaction;
      const daysBetween = getDatesBetween(startDate, endDate);
      if (!unavailableDates.includes(startDate.toISOString().slice(0, 10))) {
        unavailableDates.push(startDate.toISOString().slice(0, 10));
      }
      daysBetween.forEach((date) => {
        if (!unavailableDates.includes(date.toISOString().slice(0, 10))) {
          unavailableDates.push(date.toISOString().slice(0, 10));
        }
      });
      if (!unavailableDates.includes(endDate.toISOString().slice(0, 10))) {
        unavailableDates.push(endDate.toISOString().slice(0, 10));
      }
    });
    res.status(200).json({ success: true, result: unavailableDates });
  } catch (error) {
    logError("Error retrieving unavailable dates:", error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};
function getDatesBetween(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
export default { createTransaction, getUnavailableDates };
