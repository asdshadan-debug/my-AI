import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
  res.send("Shadan AI server running");
});

app.post("/chat",(req,res)=>{
  const {message} = req.body;

  if(!message){
    return res.json({reply:"Message missing"});
  }

  res.json({
    reply: "You said: " + message
  });
});

app.listen(PORT,()=>{
  console.log("Server running on port "+PORT);
});
