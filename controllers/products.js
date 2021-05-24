const products = [];

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
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};
