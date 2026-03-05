import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// memory chat storage
let chats = {};

// chat endpoint
app.post("/chat", async (req, res) => {

  const userMsg = req.body.message || "";
  const chatId = req.body.chatId || "default";

  if(!chats[chatId]) chats[chatId] = [];

  chats[chatId].push({role:"user",content:userMsg});

  let reply = "";

  const msgLower = userMsg.toLowerCase();

  if(
    msgLower.includes("naam") ||
    msgLower.includes("name") ||
    msgLower.includes("who are you")
  ){
    reply = "Mera naam Shadan AI hai.";
  }
  else if(
    msgLower.includes("kisne rakha") ||
    msgLower.includes("who created you")
  ){
    reply = "Mujhe Shadan ne banaya hai.";
  }
  else{
    reply = "Aapne kaha: " + userMsg;
  }

  chats[chatId].push({role:"assistant",content:reply});

  res.json({reply});

});

app.get("/", (req,res)=>{
  res.send("Shadan AI server running");
});

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});
