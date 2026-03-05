import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req,res)=>{
  res.send("Shadan AI server running");
});

app.post("/chat",(req,res)=>{

  const message = req.body.message || "";
  let reply = "";

  const msg = message.toLowerCase();

  if(msg.includes("name") || msg.includes("naam")){
    reply = "Mera naam Shadan AI hai.";
  }
  else if(msg.includes("kisne banaya")){
    reply = "Mujhe Shadan ne banaya hai.";
  }
  else if(msg.includes("hello") || msg.includes("hi")){
    reply = "Hello! Main Shadan AI hu.";
  }
  else{
    reply = "Aapne kaha: " + message;
  }

  res.json({
    reply: reply
  });

});

app.listen(PORT,()=>{
  console.log("Shadan AI server running");
});
