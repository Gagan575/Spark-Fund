const express = require("express");
const {
  generateIdeaScore,
  generateInvestment,
  generateEnhancedDescription,
  chat
} = require("../apis/AI/AIcontroller");

const router = express.Router();

router.post("/idea-score", generateIdeaScore);
router.post("/investment-suggestion", generateInvestment);
router.post("/enhance-description",  generateEnhancedDescription);
router.post("/chat", chat);


module.exports = router;
