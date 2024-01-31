import mongoose from "mongoose";
import { logError, logInfo } from "../util/logging.js";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

const Category = mongoose.model("categories", categorySchema);

const initializeCategories = async () => {
  try {
    const count = await Category.countDocuments({});
    if (count === 0) {
      const initialCategories = [
        {
          name: "Sound & Vision",
          icon: "/assets/categories/sound-and-vision.png",
        },
        {
          name: "Gaming",
          icon: "/assets/categories/gaming.png",
        },
        {
          name: "Transport",
          icon: "/assets/categories/transport.png",
        },
        {
          name: "Computers",
          icon: "/assets/categories/computers.png",
        },
        {
          name: "Care",
          icon: "/assets/categories/care.png",
        },
        {
          name: "Clothing",
          icon: "/assets/categories/clothes.png",
        },
        {
          name: "Tool",
          icon: "/assets/categories/tools.png",
        },
        {
          name: "Kitchen",
          icon: "/assets/categories/kitchen.png",
        },
        {
          name: "Household",
          icon: "/assets/categories/household.png",
        },
        {
          name: "Sports & Leisure",
          icon: "/assets/categories/sports-and-leisure.png",
        },
        {
          name: "Party & Event",
          icon: "/assets/categories/party-and-event.png",
        },
        {
          name: "Pets",
          icon: "/assets/categories/pets.png",
        },
      ];

      await Category.insertMany(initialCategories);
      logInfo("Initial categories inserted successfully");
    } else {
      logInfo("Categories already exist");
    }
  } catch (error) {
    logError(error);
  }
};

export { Category, initializeCategories };
