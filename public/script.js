document.getElementById('transactionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const paymentType = document.getElementById('paymentType').value;
  const perBoxPrice = parseInt(document.getElementById('perBoxPrice').value);
  const pieces = parseInt(document.getElementById('pieces').value);

  const response = await fetch('/api/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentType, perBoxPrice, pieces })
  });

  if (response.ok) {
    loadTransactions();
    e.target.reset();
  }
});

async function loadTransactions() {
  const res = await fetch('/api/transactions');
  const data = await res.json();
  const tbody = document.getElementById('transactionTable');
  tbody.innerHTML = '';

  let totalPeso = 0;
  let totalPieces = 0;

  data.forEach(trx => {
    totalPeso += trx.total;
    totalPieces += trx.pieces;
    const row = `<tr>
      <td>${trx.payment_type}</td>
      <td>${trx.per_box_price}</td>
      <td>${trx.pieces}</td>
      <td>${trx.total}</td>
      <td>${new Date(trx.created_at).toLocaleString()}</td>
    </tr>`;
    tbody.innerHTML += row;
  });

  document.getElementById('totalPeso').textContent = totalPeso;
  document.getElementById('totalPieces').textContent = totalPieces;
}

loadTransactions();
