import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// chat memory store
let chats = {};

app.get("/", (req,res)=>{
  res.send("Shadan AI server running");
});

app.post("/chat", async (req,res)=>{

  const {message,chatId} = req.body;

  if(!chatId){
    return res.json({reply:"chatId missing"});
  }

  if(!chats[chatId]){
    chats[chatId] = [];
  }

  chats[chatId].push({
    role:"user",
    content:message
  });

  let reply="";

  const msgLower = message.toLowerCase();

  if(msgLower.includes("naam")){
    reply="Mera naam Shadan AI hai.";
  }

  else if(msgLower.includes("kisne rakha")){
    reply="Mera naam mere creator ne rakha hai.";
  }

  else{
    reply="Aapne kaha: "+message;
  }

  chats[chatId].push({
    role:"assistant",
    content:reply
  });

  res.json({reply});

});

app.listen(PORT,()=>{
  console.log("Server running on port "+PORT);
});
