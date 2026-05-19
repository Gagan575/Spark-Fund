const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    categoryName: { type: String, required: true },
    image:{ type: String, required: true },
    description: { type: String, default: "" },
    status: { type: Boolean, default: true }, // active/inactive
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CategoryModel", CategorySchema);
