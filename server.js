const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Shadan AI server running");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  res.json({
    reply: "You said: " + message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
