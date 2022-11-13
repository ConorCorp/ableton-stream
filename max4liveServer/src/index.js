const express = require("express");
// COMMENT OUT FOR NON ABLETON TESTING
const maxApi = eval("require")("max-api"); //Do this so webpack doesn't shit itself.

const app = express();
const port = 3000;

app.use(express.json());

app.post("/", (req, res) => {
  res.send("Received in server.");
  console.log(req.body.command);
  // COMMENT OUT FOR NON ABLETON TESTING
  maxApi.outlet(req.body.command);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
