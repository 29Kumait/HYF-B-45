import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        // Password should be at least 8 characters and contain both numbers and letters
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
      },
      message:
        "Password must be at least 8 characters and contain both numbers and letters",
    },
  },
  firstName: { type: String },
  lastName: { type: String },
  cityName: { type: String, required: true },
  imageURL: { type: String },
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "username",
    "email",
    "password",
    "firstName",
    "lastName",
    "cityName",
    "imageURL",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.username == null) {
    errorList.push("username is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  }

  if (userObject.cityName == null) {
    errorList.push("cityName is a required field");
  }

  return errorList;
};

export default User;
