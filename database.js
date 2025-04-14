const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('customers.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      email TEXT NOT NULL,
      dateOfBirth TEXT NOT NULL,
      age INTEGER NOT NULL,
      cardHolderName TEXT NOT NULL,
      cardNumber TEXT NOT NULL,
      expiryDate TEXT NOT NULL,
      cvv TEXT NOT NULL,
      timestamp TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Customer table is ready.');
    }
  });
});

module.exports = db;
