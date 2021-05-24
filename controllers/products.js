const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // render template
  // refers to /views/add-product.ejs
  res.render("add-product", {
    // pass these variables into the templates
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);

  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();

  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};
