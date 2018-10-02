const express = require("express"),
  getPlayersFromWorld = require("./getPlayersFromWorld"),
  app = express();

app.get("/:world", (req, res) => {
  getPlayersFromWorld(
    req.params.world.replace(/\b\w/g, l => l.toUpperCase())
  ).then(value => res.json(value));
});

app.listen(4000, () => {
  console.log("Crawling data...");
});
