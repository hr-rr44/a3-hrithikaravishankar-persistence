const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: String,
  category: String,
  expirationDate: String,
  daysUntilExpiration: Number,
  urgent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);
