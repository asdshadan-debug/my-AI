const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("Shadan AI server running");
});

app.post("/chat",(req,res)=>{

  const message = req.body.message?.toLowerCase() || "";

  let reply = "";

  if(message.includes("hello")){
    reply = "Hello! Main Shadan AI hu.";
  }
  else if(message.includes("name")){
    reply = "Mera naam Shadan AI hai.";
  }
  else if(message.includes("kaise ho")){
    reply = "Main theek hu. Tum kaise ho?";
  }
  else if(message.includes("kya")){
    reply = "Thoda detail me pucho taaki main help kar saku.";
  }
  else{
    reply = "Mujhe samajh nahi aaya. Thoda aur clear pucho.";
  }

  res.json({ reply });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("Server running on port "+PORT);
});
