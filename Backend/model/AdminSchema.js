import mongoose from "mongoose";

// Define the Admin schema
const AdminSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      unique: true,
      trim: true, // Removes whitespace from start and end
    },
    email: {
      type: String,
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Connect to the existing `dentalAdmin` collection
const Admin = mongoose.model("Admins", AdminSchema);

export default Admin;
