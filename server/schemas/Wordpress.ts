import mongoose from "mongoose";
import { db } from "../database";

const wordpressSchema = new mongoose.Schema({
  dbRootPass: String,
  dbWordpressPass: String,
  building: Boolean,
  active: Boolean,
  ip: String,
  subdomain: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Wordpress =
  mongoose.models.UsWordpresser ||
  mongoose.model("UsWordpresser", wordpressSchema);
