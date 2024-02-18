const sqlite3 = require("sqlite3").verbose();

//Initiallize sqlLite database  connection
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.log("error checking1" + err);
  }
  console.log("Connected to the database");
});

//create table for sorting users
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT,type string,token string)",
    (err) => {
      if (err) {
        console.log("error checking2" + err);
      } else {
        console.log("table usersAuths created successfully");
      }
    },
  );
});
//create table for sorting product
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT,category Text,company Text, description TEXT)",
    (err) => {
      if (err) {
        console.log("error checking3" + err);
      } else {
        console.log("table products created successfully");
      }
    },
  );
});

//create table for OTPVerrification.
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS OTPVarifications (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, verificationcode TEXT, expirationtime INTEGER)",
    (err) => {
      if (err) {
        console.log("error checking3" + err);
      } else {
        console.log("table OTPVarifications created successfully.");
      }
    },
  );
});

// db.serialize(() => {
//   db.run(
//     "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, description TEXT, price REAL)",
//     (err) => {
//       if (err) {
//         console.error(err.message);
//       }
//       console.log("Table BOOKS created successfully");
//     },
//   );
// });

module.exports = db;
