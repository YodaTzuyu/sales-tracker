const Database = require('better-sqlite3');
const db = new Database('sales.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      payment_type TEXT NOT NULL,
      per_box_price INTEGER NOT NULL,
      pieces INTEGER NOT NULL,
      total INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
