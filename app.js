const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/add", (req, res, next) => {
  res.send(
    "<form action='product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Cool beans</h1>");
});

app.listen(3000);
