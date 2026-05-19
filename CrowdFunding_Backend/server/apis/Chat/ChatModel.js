// MessageModel.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("MessageModel", MessageSchema);
