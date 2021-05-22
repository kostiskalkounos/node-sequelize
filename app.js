const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Hello");
  next(); // Allows the request to continue to the next middleware
});

app.use((req, res, next) => {
  console.log("Sup");
  res.send("<h1>Cool beans</h1>");
});

app.listen(3000);
