import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { logError, logInfo } from "../util/logging.js";
import validateAllowedFields from "../util/validateAllowedFields.js";
import { Category } from "./Category.js";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  deposit: { type: Number },
  active: { type: Boolean, default: true },
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

// find category id based on category name
const getCategoryIdByName = async (categoryName) => {
  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      throw new Error(`Category not found for name: ${categoryName}`);
    }
    return category._id;
  } catch (error) {
    logError(error);
    throw error;
  }
};

// map category-id to each item in our itemData
const updateItemDataWithCategories = async (itemsData) => {
  for (const item of itemsData) {
    try {
      const categoryId = await getCategoryIdByName(item.category);
      if (categoryId) {
        item.category_id = categoryId;
      } else {
        logError(`Category not found for item with category ${item.category}`);
      }
    } catch (error) {
      logError(
        `Error updating item data for category ${item.category}: ${error}`
      );
    }
  }
};

// Sample data for seeding
const itemsData = [
  {
    title: "bike",
    description: "Description for bike",
    category: "Transport",
    imageURL: "../client/src/assets/items/bike.jpeg",
    price: 50,
    deposit: 10,
    active: true,
    renter_id: new ObjectId("65b2efd6535266ef21d4942f"),
  },
  {
    title: "camera",
    description: "Description for camera",
    category: "Sound & Vision",
    imageURL: "../client/src/assets/items/camera.jpeg",
    price: 75,
    deposit: 15,
    active: true,
    renter_id: new ObjectId("65b2efd6535266ef21d4942f"),
  },
  {
    title: "guitar",
    description: "Description for guitar",
    category: "Sound & Vision",
    imageURL: "../client/src/assets/items/guitar.jpeg",
    price: 75,
    deposit: 15,
    active: true,
    renter_id: new ObjectId("65b2efd6535266ef21d4942f"),
  },
  {
    title: "ladder",
    description: "Description for ladder",
    category: "Tool",
    imageURL: "../client/src/assets/items/ladder.jpeg",
    price: 75,
    deposit: 15,
    active: true,
    renter_id: new ObjectId("65b2efd6535266ef21d4942f"),
  },
  {
    title: "laptop",
    description: "Description for laptop",
    category: "Computers",
    imageURL: "../client/src/assets/items/laptop.jpeg",
    price: 75,
    deposit: 15,
    active: true,
    renter_id: new ObjectId("65b2efd6535266ef21d4942f"),
  },
  {
    title: "table",
    description: "Description for table",
    category: "Household",
    imageURL: "../client/src/assets/items/table.jpeg",
    price: 75,
    deposit: 15,
    active: true,
    renter_id: new ObjectId("65b2efd6535266ef21d4942f"),
  },
  {
    title: "tool-set",
    description: "Description for tool-set",
    category: "Tool",
    imageURL: "../client/src/assets/items/tool-set.jpeg",
    price: 75,
    deposit: 15,
    active: true,
    renter_id: new ObjectId("65b2efd6535266ef21d4942f"),
  },
];

const initializeItems = async () => {
  try {
    const count = await Item.countDocuments({});
    if (count === 0) {
      await updateItemDataWithCategories(itemsData);
      await Item.insertMany(itemsData);
      logInfo("Initial items inserted successfully");
    } else {
      logInfo("items already exist");
    }
  } catch (error) {
    logError(error);
  }
};

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

export { Item, initializeItems };
