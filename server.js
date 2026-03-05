import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Shadan AI server running");
});

// Smart reply function
function getReply(message){

  const msg = message.toLowerCase();

  const responses = {

    hello: [
      "Hello! Main Shadan AI hoon.",
      "Hi! Kaise help kar sakta hoon?",
      "Namaste! Kya puchna chahte ho?"
    ],

    name: [
      "Mera naam Shadan AI hai.",
      "Log mujhe Shadan AI kehte hain."
    ],

    creator: [
      "Mujhe Shadan ne banaya hai.",
      "Mere creator Shadan hain."
    ],

    howareyou: [
      "Main badhiya hoon 😄 tum kaise ho?",
      "Sab badhiya! Tum batao?"
    ]

  };

  if(msg.includes("hello") || msg.includes("hi")){
    return responses.hello[Math.floor(Math.random()*responses.hello.length)];
  }

  if(msg.includes("name") || msg.includes("naam")){
    return responses.name[Math.floor(Math.random()*responses.name.length)];
  }

  if(msg.includes("kisne banaya") || msg.includes("creator")){
    return responses.creator[Math.floor(Math.random()*responses.creator.length)];
  }

  if(msg.includes("kaise ho") || msg.includes("how are you")){
    return responses.howareyou[Math.floor(Math.random()*responses.howareyou.length)];
  }

  return "Mujhe ye samajh nahi aaya. Thoda aur clear pucho.";
}

// Chat route
app.post("/chat", (req,res)=>{

  const {message} = req.body;

  if(!message){
    return res.json({reply:"Message missing"});
  }

  const reply = getReply(message);

  res.json({reply});

});

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});
