const path = require("path");
const express = require("express");

const router = express.Router();
const products = [];

router.get("/add-product", (req, res, next) => {
  // render template
  // refers to /views/add-product.ejs
  res.render("add-product", {
    // pass these variables into the templates
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
