const express = require("express");
const router = express.Router();
const Message = require("../apis/Chat/ChatModel");
const UserModel = require("../apis/User/UserModel");
const IdeaPitchModel = require("../apis/IdeaPitch/IdeaPitchModel");
const InvestmentModel = require("../apis/Investment/InvestmentModel");

// ✅ Get investors for an owner
// ✅ Get investors for an owner
router.post("/get-chat-investors", async (req, res) => {
  const { ownerId } = req.body;
  if (!ownerId) return res.json({ success: false, message: "ownerId is required" });

  try {
    const ideas = await IdeaPitchModel.find({ ownerId }).select("_id");
    const ideaIds = ideas.map(i => i._id);

    const investments = await InvestmentModel.find({
      ideaId: { $in: ideaIds },
      status: "Active" // <-- fix
    }).populate({ path: "investorId", select: "name email contact role profileImage" });

    const investorsMap = {};
    investments.forEach(inv => {
      if (inv.investorId) investorsMap[inv.investorId._id] = inv.investorId;
    });

    res.json({ success: true, data: Object.values(investorsMap) });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ✅ Get owners for an investor
router.post("/get-chat-owners", async (req, res) => {
  const { investorId } = req.body;
  if (!investorId) return res.json({ success: false, message: "investorId is required" });

  try {
    const investments = await InvestmentModel.find({
      investorId,
      status: "Active" // <-- fix
    }).populate({
      path: "ideaId",
      select: "ownerId",
      populate: { path: "ownerId", select: "name email contact role profileImage" }
    });

    const ownersMap = {};
    investments.forEach(inv => {
      if (inv.ideaId?.ownerId) ownersMap[inv.ideaId.ownerId._id] = inv.ideaId.ownerId;
    });

    res.json({ success: true, data: Object.values(ownersMap) });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});



// ✅ Get admin for owner/investor chat
router.post("/get-admin", async (req, res) => {
  try {
    const admin = await UserModel.findOne({ role: "admin" }).select("name email _id profileImage");
    if (!admin) return res.json({ success: false, message: "No admin found" });
    res.json({ success: true, data: [admin] });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});
// Get all investors (for admin)
router.get("/get-all-investors", async (req, res) => {
  try {
    const investors = await UserModel.find({ role: "investor" }).select("name email role _id profileImage");
    res.json({ success: true, data: investors });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Get all owners (for admin)
router.get("/get-all-owners", async (req, res) => {
  try {
    const owners = await UserModel.find({ role: "owner" }).select("name email role _id profileImage" );
    res.json({ success: true, data: owners });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});



// ✅ Load old messages between two users
router.post("/get-messages", async (req, res) => {
  const { userId, receiverId } = req.body;
  if (!userId || !receiverId) return res.json({ success: false, message: "userId & receiverId required" });

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json({ success: true, data: messages });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ✅ Get conversations for Owner
router.post("/owner-conversations", async (req, res) => {
  const { ownerId } = req.body;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: ownerId },
        { receiverId: ownerId }
      ]
    });

    const users = new Set();
    messages.forEach(msg => {
      if (msg.senderId.toString() !== ownerId) users.add(msg.senderId.toString());
      if (msg.receiverId.toString() !== ownerId) users.add(msg.receiverId.toString());
    });

    res.json({ success: true, data: Array.from(users) });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ✅ Get conversations for Admin
router.post("/admin-conversations", async (req, res) => {
  const { adminId } = req.body;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: adminId },
        { receiverId: adminId }
      ]
    });

    const users = new Set();
    messages.forEach(msg => {
      if (msg.senderId.toString() !== adminId) users.add(msg.senderId.toString());
      if (msg.receiverId.toString() !== adminId) users.add(msg.receiverId.toString());
    });

    res.json({ success: true, data: Array.from(users) });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
