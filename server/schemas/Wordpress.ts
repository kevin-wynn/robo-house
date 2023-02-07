import mongoose from "mongoose";

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
  mongoose.models.Wordpress || mongoose.model("Wordpress", wordpressSchema);
