import mongoose from "mongoose";

const UserForm = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phonenumber: {
      type: String,
      required: true,
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
      required: true,
    },

    message: {
      type: String,
      required: true,
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

// Vercel/serverless safe
const UserModels =
  mongoose.models.Enquiry || mongoose.model("Enquiry", UserForm);

export default UserModels;
