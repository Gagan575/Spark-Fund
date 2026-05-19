const mongoose = require("mongoose")

const IdeaLikesSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "IdeaPitchModel", required: true },
  createdAt: { type: Date, default: Date.now },
  status:{type:Boolean,default:true}

});
module.exports = mongoose.model("IdeaLikesModel", IdeaLikesSchema);