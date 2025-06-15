const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/transaction', (req, res) => {
  const { paymentType, perBoxPrice, pieces } = req.body;
  const total = perBoxPrice * pieces;
  db.run(
    'INSERT INTO transactions (payment_type, per_box_price, pieces, total) VALUES (?, ?, ?, ?)',
    [paymentType, perBoxPrice, pieces, total],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.get('/api/transactions', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
