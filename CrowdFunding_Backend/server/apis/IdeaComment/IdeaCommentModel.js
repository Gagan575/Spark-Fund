const mongoose = require("mongoose")

const IdeaCommentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "IdeaPitchModel", required: true },
  commentText:{type:String,default:""},

  status:{type:Boolean,default:true},
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("IdeaCommentModel", IdeaCommentSchema);