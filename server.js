const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req,res)=>{
  res.send("Shadan AI server running");
});

// Chat route
app.post("/chat",(req,res)=>{

  const message = req.body.message || "";

  let reply = "";

  if(message.toLowerCase().includes("name")){
    reply = "I am Shadan AI.";
  }
  else if(message.toLowerCase().includes("hello")){
    reply = "Hello! How can I help you?";
  }
  else{
    reply = "You said: " + message;
  }

  res.json({reply});

});

app.listen(PORT,()=>{
  console.log("Server running on port "+PORT);
});
