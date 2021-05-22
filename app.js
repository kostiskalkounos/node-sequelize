const express = require("express");

const app = express();

app.use("/add", (req, res, next) => {
  res.send("<h1>Add Cool beans</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Cool beans</h1>");
});

app.listen(3000);
