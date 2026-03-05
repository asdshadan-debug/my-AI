import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

let chats = {};

// Home route
app.get("/", (req,res)=>{
  res.send("Shadan AI server running");
});

// Chat route
app.post("/chat", async (req,res)=>{

  const {message,chatId} = req.body;

  if(!chatId){
    return res.json({reply:"chatId missing"});
  }

  if(!chats[chatId]){
    chats[chatId] = [
      {
        role:"system",
        content:"You are Shadan AI, a smart helpful AI assistant. Never say ChatGPT or OpenAI. Your name is Shadan AI. Answer clearly and intelligently."
      }
    ];
  }

  chats[chatId].push({
    role:"user",
    content:message
  });

  try{

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${process.env.API_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"openai/gpt-3.5-turbo",
        messages:chats[chatId]
      })
    });

    const data = await response.json();

    let reply = data.choices[0].message.content;

    chats[chatId].push({
      role:"assistant",
      content:reply
    });

    res.json({reply});

  }catch(err){
    console.log(err);
    res.json({reply:"Server error"});
  }

});

app.listen(PORT,()=>{
  console.log("Shadan AI server running on port "+PORT);
});
