const mongoose = require("mongoose")
const IdeaPitchSchema = mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "CategoryModel", required: true  },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  pitchVideoUrl: { type: String, default: "" },

  totalSales: { type: Number, default: 11 },
  currentYearSales: { type: Number, default: 90 }, // in minutes
  aiScore:{type:String,default:""},
  status: { type: String, enum: ["Pending","Approved","Rejected","Funded"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("IdeaPitchModel", IdeaPitchSchema);