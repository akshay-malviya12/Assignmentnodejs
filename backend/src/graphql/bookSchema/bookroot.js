const db = require("../../models/bookcurd");

const root = {
  //get all books data.
  books: async () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM books`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log(rows);
          const books = rows.map((row) => {
            return {
              id: row.id,
              title: row.title,
              author: row.author,
              description: row.description,
              price: row.price,
            };
          });
          resolve(books);
        }
      });
    });
  },
  //get single books data.
  book: async ({ id }) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM books WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  //add books in database.
  createBook: async ({ title, author, description, price }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO books(title, author, description, price) VALUES(?,?,?,?)`,
        [title, author, description, price],
        function (err) {
          if (err) {
            reject(err);
          } else {
            const bookId = this.lastID;
            db.get(`SELECT * FROM books WHERE id = ?`, [bookId], (err, row) => {
              if (err) {
                reject(err);
              } else {
                resolve(row);
              }
            });
          }
        },
      );
    });
  },
  // Update the updateBook resolver in backend/src/graphql/bookSchema/bookroot.js
  updateBook: async ({ id, title, author, description, price }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE books SET title = ?, author = ?, description = ?, price = ? WHERE id = ?`,
        [title, author, description, price, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            db.get(`SELECT * FROM books WHERE id = ?`, [id], (err, row) => {
              if (err) {
                reject(err);
              } else {
                resolve(row); // Return the updated book data after the update operation
              }
            });
          }
        },
      );
    });
  },
  //delete books by id in databse.
  deleteBook: async ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM books WHERE id = ?`, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Book deleted successfully" });
        }
      });
    });
  },
};

module.exports = root;
