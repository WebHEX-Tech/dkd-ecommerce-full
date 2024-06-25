import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: String,
  username: String,
  firstname: String,
  lastname: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;