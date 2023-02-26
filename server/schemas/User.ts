import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  password: String,
  company: String,
  street: String,
  zipcode: String,
  state: String,
  city: String,
  code: Number,
  userType: String,
  harvestID: Number,
  newClient: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: "created",
  },
  wordpress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wordpress",
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
