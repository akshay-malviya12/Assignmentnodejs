// // Open a database connection
const db = require("../models/db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, description TEXT, price REAL)",
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Table BOOKS created successfully");
    },
  );
});

module.exports = db;
