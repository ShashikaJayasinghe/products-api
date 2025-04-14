const express = require('express');
const app = express();
const db = require('./database');
const PORT = 3000;

app.use(express.json());

// Validation functions
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCardNumber(cardNumber) {
  return /^\d{12}$/.test(cardNumber);
}

function isValidCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

// POST API to register a customer
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

  // Check for missing fields
  if (!name || !address || !email || !dateOfBirth || !age || !cardHolderName || !cardNumber || !expiryDate || !cvv || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Field validations
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!isValidCardNumber(cardNumber)) {
    return res.status(400).json({ error: 'Card number must be 12 digits' });
  }

  if (!isValidCVV(cvv)) {
    return res.status(400).json({ error: 'CVV must be 3 digits' });
  }

  const query = `
    INSERT INTO customer 
    (name, address, email, dateOfBirth, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [name, address, email, dateOfBirth, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp];

  db.run(query, values, function (err) {
    if (err) {
      console.error('Error inserting customer:', err.message);
      return res.status(400).json({ error: 'Failed to register customer' });
    }

    return res.status(201).json({
      message: ` customer ${cardHolderName} has registered`,
      customerId: this.lastID.toString()
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
