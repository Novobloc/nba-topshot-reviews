const express = require("express");
var axios = require("axios");
var cors = require("cors");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World! Server is running");
});

// eslint-disable-next-line no-unused-vars
app.post("/query", function (req, res) {
  var data = JSON.stringify({
    query: req.body.query,
    variables: req.body.variables
  });
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://public-api.nbatopshot.com/graphql",//: https://nbatopshot.com/marketplace/graphql?GetEditionListingDefault
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `Hackathon-2023-${Date.now()}`
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.info("\nShutting down server...");
  process.exit(0);
});
