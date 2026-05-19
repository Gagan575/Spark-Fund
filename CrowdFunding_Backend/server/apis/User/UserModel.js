const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  contact: { type: Number, default: 0 },
  profileImage: { type: String, default: "" },
  role: { type: String, enum: ["admin", "owner", "investor"] }, // 1-Admin, 2-Coach, 3-User
  
  status: { type: String, enum: ["Active", "Blocked"], default: "Active" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("UserModel", UserSchema);