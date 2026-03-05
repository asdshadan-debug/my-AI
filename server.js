const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Shadan AI server running");
});

// chat route
app.post("/chat", (req, res) => {

  const message = req.body.message;

  if(!message){
    return res.json({reply:"Message missing"});
  }

  // simple AI reply
  let reply = "Hello! Main Shadan AI hu.";

  if(message.toLowerCase().includes("name")){
    reply = "Mera naam Shadan AI hai.";
  }

  if(message.toLowerCase().includes("hello")){
    reply = "Hello bhai! Kaise ho?";
  }

  res.json({ reply });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
