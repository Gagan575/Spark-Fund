const mongoose = require("mongoose")

const InvestorSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  country:{type:String,default:""},
  riskPreference:{type: String,  default: ""},
 verificationImage:{type:String,default:""},
  kycStatus: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("InvestorModel", InvestorSchema)
