import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  address: String,
  userType: String,
  harvestID: Number,
  newClient: {
    type: Boolean,
    default: true,
  },
  wordpress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wordpress",
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
