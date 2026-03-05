const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// chat memory
let chats = {};

// server test
app.get("/", (req, res) => {
  res.send("Shadan AI server running");
});

// chat API
app.post("/chat", (req, res) => {

  const { message, chatId } = req.body;

  if (!chatId) {
    return res.json({ reply: "chatId missing" });
  }

  if (!chats[chatId]) {
    chats[chatId] = [];
  }

  chats[chatId].push({ role: "user", content: message });

  const msg = message.toLowerCase();
  let reply = "";

  if (msg.includes("name")) {
    reply = "My name is Shadan AI.";
  } 
  else if (msg.includes("who made you") || msg.includes("kisne banaya")) {
    reply = "I was created by Shadan.";
  } 
  else if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hello! I am Shadan AI. How can I help you?";
  } 
  else {
    reply = "You said: " + message;
  }

  chats[chatId].push({ role: "assistant", content: reply });

  res.json({ reply });

});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
