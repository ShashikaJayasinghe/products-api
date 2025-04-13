const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create Customer Table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customer (
      customerId INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      email TEXT NOT NULL UNIQUE,
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
