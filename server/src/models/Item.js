import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  renter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
});

const Item = mongoose.model("items", itemSchema);
export const validateItem = (itemObject) => {
  const errorList = [];
  const allowedKeys = [
    "title",
    "description",
    "category",
    "imageURL",
    "price",
    "renter_id",
    "category_id",
  ];

  const validatedKeysMessage = validateAllowedFields(itemObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (itemObject.title == null) {
    errorList.push("title is a required field");
  }

  if (itemObject.category == null) {
    errorList.push("category is a required field");
  }

  if (itemObject.imageURL == null) {
    errorList.push("imageURL is a required field");
  }

  if (itemObject.price == null) {
    errorList.push("price is a required field");
  } else if (isNaN(itemObject.price) || itemObject.price <= 0) {
    errorList.push("price must be a positive number");
  }

  if (itemObject.renter_id == null) {
    errorList.push("renter_id is a required field");
  }

  if (itemObject.category_id == null) {
    errorList.push("category_id is a required field");
  }

  return errorList;
};

export default Item;
