const mongoose = require("mongoose")

const IdeaMediaSchema = mongoose.Schema({
 
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "IdeaPitchModel", required: true },
  mediaUrl: [{ type: String, default: "" }],
  mediaType: [{ type: String, default: "" }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("IdeaMediaModel", IdeaMediaSchema);