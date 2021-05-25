const path = require("path");
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs"); // Register template engine
app.set("views", "views"); // Not needed, the default path is already '/views'

// Middleware is triggered by incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Store User into a request to use them anywhere in the app
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      // Store the user we retrive from the database into the request
      req.user = user; // user is a sequelize object and it includes methods like destroy()
      next(); // continue with the next step if we got our user and stored it
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// If a User is deleted, delete the products too
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product); // optional

User.hasOne(Cart); // Both of these add the userId to the cart to which it belongs
Cart.belongsTo(User); // optional: this or the above, both aren't needed. Same case as above

Cart.belongsToMany(Product, { through: CartItem }); // Thrgouh key tells sequalize were these connections should be stored
Product.belongsToMany(Cart, { through: CartItem }); // meaning what's the inbetween table that connect them

// create the appropriate tables or define relations based on models/products
// and it's triggered by npm start
sequelize
  //.sync({ force: true }) // Forces the tables to be overwritten
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Kostis", email: "test@test.com" });
    }

    // return Promise.resolve(user);
    // A value in a then block is automatically wrapped into a new promise
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((_cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
