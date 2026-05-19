require("dotenv").config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


const API_KEY = process.env.GEMINI_API_KEY;

/* =========================
   1️⃣ IDEA AI SCORE
========================= */
const getIdeaAIScore = (data) => {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
You are a startup evaluator.

Title: ${data.title}
Description: ${data.description}
Total Sales: ${data.totalSales}
Current Year Sales: ${data.currentYearSales}

Return ONLY JSON:

{
  "aiScore": "number out of 100",
  "remark": "1 line reason"
}
`
              }
            ]
          }
        ]
      })
    }
  )
    .then((res) => res.json())
    .then((result) => {
      const text = result.candidates[0].content.parts[0].text;

// 🔥 REMOVE ```json ``` wrappers if present
const cleanText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleanText);

    })
    .catch((err) => {
      console.error("getIdeaAIScore error:", err);
      throw err;
    });
};

/* =========================
   2️⃣ INVESTMENT SUGGESTION
========================= */
const getInvestmentSuggestion = (data) => {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
You are an investment advisor in India.

Idea Title: ${data.title}
Description: ${data.description}
AI Score: ${data.aiScore}

Return ONLY JSON:

{
  "amount": "investment amount in INR",
  "equityPercent": "equity percentage",
  "reason": "1 line justification"
}
`
              }
            ]
          }
        ]
      })
    }
  )
    .then((res) => res.json())
    .then((result) => {
      const text = result.candidates[0].content.parts[0].text;

// 🔥 REMOVE ```json ``` wrappers if present
const cleanText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleanText);
     
    })
    .catch((err) => {
      console.error("getInvestmentSuggestion error:", err);
      throw err;
    });
};


/* =========================
   3️⃣ DESCRIPTION ENHANCER
========================= */
/* =========================
   3️⃣ DESCRIPTION ENHANCER
========================= */
const enhanceDescription = (data) => {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
You are a professional startup pitch assistant.

Original Title:
${data.title}

Original Description:
${data.description}

TASK:
1. Improve the title to be short, catchy, and investor-friendly.
2. Improve the description to be clear, engaging, and professional.

Return ONLY valid JSON in this exact format:
{
  "enhancedTitle": "...",
  "enhancedDescription": "..."
}
`
              }
            ]
          }
        ]
      })
    }
  )
    .then((res) => res.json())
    .then((result) => {
      console.log(
    "Gemini raw response:",
    JSON.stringify(result, null, 2)
  );
      const rawText =
        result.candidates &&
        result.candidates[0] &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts[0] &&
        result.candidates[0].content.parts[0].text;

      if (!rawText) {
  // ✅ Gemini failed silently — return original data
  return {
    enhancedTitle: data.title,
    enhancedDescription: data.description
  };
}

      // 🔥 Remove markdown wrappers if present
      const cleanText = rawText.replace(/```json|```/g, "").trim();

// ✅ extract JSON safely
const jsonStart = cleanText.indexOf("{");
const jsonEnd = cleanText.lastIndexOf("}");

if (jsonStart === -1 || jsonEnd === -1) {
  throw new Error("Invalid JSON format from Gemini");
}

const jsonString = cleanText.slice(jsonStart, jsonEnd + 1);

return JSON.parse(jsonString);
 // ✅ { enhancedTitle, enhancedDescription }
    })
    .catch((err) => {
      console.error("enhanceIdea error:", err.message || err);
      throw err;
    });
};








/* =========================
   4️⃣ AI CHATBOT
========================= */
const chatWithAI = (data) => {
  const { message, history } = data;

  // Build conversation history for multi-turn context
  const contents = [];

  if (history && Array.isArray(history)) {
    history.forEach((turn) => {
      contents.push({
        role: turn.role, // "user" or "model"
        parts: [{ text: turn.text }]
      });
    });
  }

  // Add the new user message
  contents.push({
    role: "user",
    parts: [{ text: message }]
  });

  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: `You are SparkBot, a helpful AI assistant for SparkFund — a crowdfunding platform that connects startup idea owners with investors.

Your role:
- Help users understand how the platform works (submitting ideas, investing, payments, categories)
- Guide idea owners on how to pitch better, improve descriptions, and get AI scores
- Help investors understand how to find and invest in ideas
- Answer questions about the investment process, equity, and how funds work
- Be friendly, concise, and encouraging

Platform features you know:
- Idea Owners can register, submit startup ideas with title, description, category, media
- AI Score: Each idea gets an AI-evaluated score (out of 100) based on potential
- Investors can browse ideas, view AI scores, and invest with equity %
- Payments are seat-based
- Admin manages categories, users, and approves ideas
- Real-time chat between owners and investors via the Chat feature
- Description Enhancer: AI can improve idea titles and descriptions

If asked something outside the platform scope, politely redirect to platform-related help.`
            }
          ]
        },
        contents: contents
      })
    }
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.candidates || !result.candidates[0]) {
        throw new Error("No response from Gemini");
      }
      const reply = result.candidates[0].content.parts[0].text;
      return { reply };
    })
    .catch((err) => {
      console.error("chatWithAI error:", err);
      throw err;
    });
};

module.exports = {
  getIdeaAIScore,
  getInvestmentSuggestion,
  enhanceDescription,
  chatWithAI
};
