const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/", (req, res) => {
  res.send("Received in server.");
  console.log(req.body.command);
  //TODO: Send this to max4live
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
