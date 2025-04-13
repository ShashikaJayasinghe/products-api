// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create the customer table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      address TEXT,
      email TEXT,
      dateOfBirth TEXT,
      age INTEGER,
      cardHolderName TEXT,
      cardNumber TEXT,
      expiryDate TEXT,
      cvv TEXT,
      timestamp TEXT
    )
  `);
});

module.exports = db;
