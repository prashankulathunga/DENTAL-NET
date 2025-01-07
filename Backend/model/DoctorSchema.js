import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema(
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
    phone: {
      type: number,
      required: [true, "Password is required"],
      minlength: [10, "Password must be at least 10 characters long"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Connect to the existing `dentalAdmin` collection
const Admin = mongoose.model("Users", DoctorSchema);

export default Admin;