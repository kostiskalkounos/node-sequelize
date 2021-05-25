const Cart = require("./cart");
const db = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // return a promise and use it where it's called
    return db.execute(
      // Insert data this way to guard against SQL injection in the input fields
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    // return a promise and use it where it's called
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    // let SQL inject the value
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
