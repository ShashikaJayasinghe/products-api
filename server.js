const express = require('express');
const app = express();
const db = require('./database');
const PORT = 3000;

app.use(express.json());

// ✅ Helper functions for validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCardNumber(cardNumber) {
  return /^\d{12}$/.test(cardNumber);
}

// ✅ POST /register-customer API
app.post('/register-customer', (req, res) => {
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

  // ✅ Validate required fields
  if (!name || !address || !email || !dateOfBirth || !age || !cardHolderName || !cardNumber || !expiryDate || !cvv || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!isValidCardNumber(cardNumber)) {
    return res.status(400).json({ error: 'Card number must be 12 digits' });
  }

  const query = `
    INSERT INTO customer 
    (name, address, email, dateOfBirth, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [name, address, email, dateOfBirth, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp];

  db.run(query, values, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(400).json({ error: 'Failed to register customer' });
    }

    return res.status(201).json({
      message: `Customer ${cardHolderName} has registered`,
      customerId: this.lastID
    });
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
