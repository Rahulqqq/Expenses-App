const API_URL = 'http://localhost:3000'; //  backend URL

// Handle User Creation
document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  const mobile = document.getElementById('user-mobile').value;

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, mobile_number: mobile }),
  });

  const data = await response.json();
  document.getElementById('user-message').innerText = data.message || 'User created successfully!';
});

// Handle Expense Creation
document.getElementById('expense-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const total_amount = document.getElementById('expense-amount').value;
  const split_method = document.getElementById('split-method').value;
  const created_by = document.getElementById('created-by').value;

  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ total_amount, split_method, created_by }),
  });

  const data = await response.json();
  document.getElementById('expense-message').innerText = data.message || 'Expense added successfully!';
});

// Handle Viewing Expenses
document.getElementById('view-expenses').addEventListener('click', async () => {
  const response = await fetch(`${API_URL}/expenses`);
  const expenses = await response.json();

  const expensesList = document.getElementById('expenses-list');
  expensesList.innerHTML = '';

  expenses.forEach((expense) => {
    const li = document.createElement('li');
    li.textContent = `Expense ID: ${expense.id}, Amount: ${expense.total_amount}, Split: ${expense.split_method}`;
    expensesList.appendChild(li);
  });
});

// Handle Downloading Excel
document.getElementById('download-excel').addEventListener('click', () => {
  window.open(`${API_URL}/expenses/download`, '_blank');
});

// Handle Downloading PDF
document.getElementById('download-pdf').addEventListener('click', () => {
  window.open(`${API_URL}/expenses/download-pdf`, '_blank');
});
