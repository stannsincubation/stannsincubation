const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const PORT = 5000;

// Connect to (or create) local SQLite database
const db = new Database('./e-commerce.db');

// Ensure seller_requests table exists automatically on start
db.exec(`
  CREATE TABLE IF NOT EXISTS seller_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    college TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(cors());
app.use(express.json());

// API route to receive form submissions from your React app
app.post('/api/seller-approval', (req, res) => {
  const { fullName, college, phone, email, productCategory, description } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO seller_requests (full_name, college, phone, email, category, description, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `);
    
    stmt.run(fullName, college, phone, email, productCategory, description || '');
    
    console.log('New seller request saved:', fullName);
    res.status(200).json({ success: true, message: 'Request submitted successfully' });
  } catch (error) {
    console.error('Error inserting seller request:', error);
    res.status(500).json({ success: false, message: 'Database error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});