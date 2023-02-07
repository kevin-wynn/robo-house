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
  street: String,
  zipcode: String,
  state: String,
  code: String,
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
