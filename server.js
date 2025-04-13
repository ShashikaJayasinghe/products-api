// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCardNumber(number) {
  return /^\d{12}$/.test(number);
}

app.post('/register', (req, res) => {
  const {
    name,
    address,
    email,
    dateOfBirth,
    age,
    cardHolderName,
    cardNumber,
    expiryDate,
    cvv,
    timestamp
  } = req.body;

  // Validation
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!isValidCardNumber(cardNumber)) {
    return res.status(400).json({ error: 'Card number must be 12 digits' });
  }

  // Insert into database
  const query = `
    INSERT INTO customer
    (name, address, email, dateOfBirth, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    address,
    email,
    dateOfBirth,
    age,
    cardHolderName,
    cardNumber,
    expiryDate,
    cvv,
    timestamp
  ];

  db.run(query, values, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.status(201).json({
      message: `Customer ${cardHolderName} has registered`,
      customerId: this.lastID
    });
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
