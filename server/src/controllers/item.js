import { Item } from "../models/Item.js";
import { logError } from "../util/logging.js";

export const getItems = async (req, res) => {
  try {
    // Fetch the first 9 items from the database
    const items = await Item.find().limit(9);

    // If successful, send a JSON response with the items
    res.status(200).json({ success: true, result: items });
  } catch (error) {
    // If an error occurs, log the error and send a 500 Internal Server Error response
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get items, try again later",
    });
  }
};
