// Open a database connection
const db = require("../models/db");
db.run("CREATE INDEX IF NOT EXISTS idx_users_id ON users(id)");
db.run("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)");
db.run(
  "CREATE INDEX IF NOT EXISTS idx_OTPVarifications_email ON OTPVarifications(email)",
);
// Define database operations
function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);

      resolve(row);
    });
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
      console.log("row", rows);
    });
  });
}

function createUser(name, email, password, role, token) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (name, email,password, role, token) VALUES (?, ?,?, ?, ?)",
      [name, email, password, role, token],
      function (err) {
        if (err) reject(err);
        resolve({ name, email, password, role, token });
      },
    );
  });
}
// Define database operations
function getUserByEmailId(Email) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT users.*,OTPVarifications.* FROM users INNER JOIN OTPVarifications ON users.email=OTPVarifications.email WHERE users.email = ?",
      [Email],
      (err, row) => {
        if (err) reject(err);
        // console.log("row");
        resolve(row);
      },
    );
  });
}
//define user update.
function updateUser(email, token) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET  token = ? WHERE email = ?",
      [token, email],
      function (err) {
        if (err) reject(err);
        resolve({ email, token });
      },
    );
  });
}
module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  getUserByEmailId,
  updateUser,
};
