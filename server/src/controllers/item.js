import { Item } from "../models/Item.js";
import { logError } from "../util/logging.js";

export const getItems = async (req, res) => {
  try {
    // Get the page number from query parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = 9;

    //Calculate the skip value based on the page number
    const skip = (page - 1) * pageSize;

    //Fetch items for the specified page with a limit of 9
    const items = await Item.find().skip(skip).limit(pageSize);

    res.status(200).json({ success: true, result: items });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get items, try again later",
    });
  }
};
