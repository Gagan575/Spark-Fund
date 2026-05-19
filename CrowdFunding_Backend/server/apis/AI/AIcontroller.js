const {
  getIdeaAIScore,
  getInvestmentSuggestion,
  enhanceDescription,
  chatWithAI
} = require("../../services/aiService");

/* =========================
   IDEA AI SCORE
========================= */
const generateIdeaScore = (req, res) => {
  const { title, description, totalSales, currentYearSales } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields"
    });
  }

  getIdeaAIScore({ title, description, totalSales, currentYearSales })
    .then((aiData) => {
      res.json({
        success: true,
        data: aiData
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to generate AI score"
      });
    });
};

/* =========================
   INVESTMENT SUGGESTION
========================= */
const generateInvestment = (req, res) => {
  const { title, description, aiScore } = req.body;

  getInvestmentSuggestion({ title, description, aiScore })
    .then((result) => {
      res.json({
        success: true,
        data: result
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to generate investment suggestion"
      });
    });
};


/* =========================
   DESCRIPTION ENHANCER
========================= */
const generateEnhancedDescription = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required"
    });
  }

  enhanceDescription({ title, description }) // ✅ FIX
    .then((enhancedData) => {
      res.json({
        success: true,
        data: enhancedData   // { enhancedTitle, enhancedDescription }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to enhance description"
      });
    });
};

/* =========================
   AI CHATBOT
========================= */
const chat = (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required"
    });
  }

  chatWithAI({ message, history: history || [] })
    .then((result) => {
      res.json({
        success: true,
        data: result
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Chatbot failed to respond"
      });
    });
};

module.exports = {
  generateIdeaScore,
  generateInvestment,
  generateEnhancedDescription,
  chat
};
