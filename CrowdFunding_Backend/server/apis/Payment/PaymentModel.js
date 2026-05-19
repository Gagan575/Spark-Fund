const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
    investmentId: { type: mongoose.Schema.Types.ObjectId, ref: "InvestmentModel", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true }, // e.g., "online", "offline"
    transactionId: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending",enum:["Pending", "Success", "Failed"] }, // e.g., pending, success, failed
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PaymentModel", PaymentSchema);

