const mongoose = require("mongoose")

const InvestmentSchema = mongoose.Schema({
  
    investorId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "IdeaPitchModel", required: true },
    amount:{type: Number, default: 11},
    equityPercent:{type:String,default:""},
  status: {
    type: String,
    enum: ["Active","Refunded","Frozen","Pending"],
    default: "Pending"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("InvestmentModel", InvestmentSchema);
