import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const UserForm = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      require: true,
      trim: true,
    },
    service: {
      type: String,
      enum: [
        "Website Development",
        "Graphic Design",
        "UI/UX Design",
        "Digital Marketing",
        "Other",
      ],
      require: true,
    },
    message: {
      type: String,
      require: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "completed", "cancelled"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

const UserModels = mongoose.model("Enquiry", UserForm);

export default UserModels;
