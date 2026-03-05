import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔹 In-memory chat storage
let chatsStore = {}; // key: chatId, value: array of messages

// 🔹 Chat endpoint
app.post("/chat", async (req, res) => {
  const { message, chatId } = req.body;
  if (!chatId) return res.json({ reply: "Error: chatId missing!" });

  // Initialize chat
  if (!chatsStore[chatId]) {
    chatsStore[chatId] = [
      { role: "Shadan AI", content: "Hello! I am Shadan AI. How can I help you?" }
    ];
  }

  const chat = chatsStore[chatId];
  chat.push({ role: "User", content: message });

  // 🔹 Special replies
  const msgLower = message.toLowerCase();
  if (msgLower.includes("name") || msgLower.includes("tum kya ho") || msgLower.includes("who are you")) {
    const reply = "Mera naam Shadan AI hai.";
    chat.push({ role: "Shadan AI", content: reply });
    return res.json({ reply });
  }
  if (msgLower.includes("kisne banaya") || msgLower.includes("banaya") || msgLower.includes("created you")) {
    const reply = "Mujhe Shadan ne banaya hai.";
    chat.push({ role: "Shadan AI", content: reply });
    return res.json({ reply });
  }

  // 🔹 Dummy context-aware reply (Hinglish style)
  let lastUser = message;
  let reply = `Haan, samajh gaya: "${lastUser}". Aur batao, kya padhna hai?`; 
  reply = reply.replace(/assistant|chatgpt/gi, "Shadan AI");

  chat.push({ role: "Shadan AI", content: reply });
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});