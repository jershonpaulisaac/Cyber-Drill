const explainer = document.getElementById('explainer');
const simulator = document.getElementById('simulator');
const tryBtn = document.getElementById('tryBtn');
const backBtn = document.getElementById('backBtn');
const loginForm = document.getElementById('loginForm');
const resultDiv = document.getElementById('result');
const queryDiv = document.getElementById('query');

// Show simulator on Try It click
tryBtn.addEventListener('click', () => {
  explainer.style.display = 'none';
  simulator.style.display = 'block';
  resultDiv.style.display = 'none';
  queryDiv.style.display = 'none';
  loginForm.reset();
});

// Back button returns to explanation
backBtn.addEventListener('click', () => {
  simulator.style.display = 'none';
  explainer.style.display = 'block';
});

// Simulated "database"
const usersDB = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'password' },
  { username: 'jershon', password: '2006' },
];

// Simulate unsafe SQL query check
function simulateSQLQuery(username, password) {
  // This is the vulnerable SQL query string:
  // SELECT * FROM users WHERE username = 'username' AND password = 'password';
  return `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`;
}

function insecureLogin(username, password) {
  // Vulnerable check: simply matches username and password exactly, no escaping
  // To simulate SQL injection, if input contains typical injection payload, we bypass auth

  // Simulate the query string that the backend runs
  const query = simulateSQLQuery(username, password);
  
  // Simple simulation of SQL injection check:
  // If the input contains ' OR '1'='1 or similar payload, we simulate a bypass.
  const injectionPatterns = [
    /('|")\s*or\s*('|")?1('|")?\s*=\s*('|")?1('|")?/i,
    /--/,
    /;/,
  ];

  const isInjection = injectionPatterns.some((pattern) =>
    pattern.test(username) || pattern.test(password)
  );

  if (isInjection) {
    return {
      success: true,
      message: "SQL Injection successful! Access granted without valid credentials.",
      query,
    };
  }

  // Otherwise, normal check for valid credentials
  const user = usersDB.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return {
      success: true,
      message: "Login successful! Credentials matched.",
      query,
    };
  } else {
    return {
      success: false,
      message: "Login failed! Invalid username or password.",
      query,
    };
  }
}

// Handle form submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();
  
  const result = insecureLogin(username, password);
  
  resultDiv.style.display = 'block';
  queryDiv.style.display = 'block';
  
  resultDiv.textContent = result.message;
  queryDiv.textContent = result.query;
  
  if (result.success) {
    resultDiv.className = 'result success';
  } else {
    resultDiv.className = 'result failure';
  }
});
// Disable right click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Disable text selection & copy
document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});
document.addEventListener("copy", function (e) {
  e.preventDefault();
});
document.addEventListener("cut", function (e) {
  e.preventDefault();
});

// Disable certain key combos
document.onkeydown = function (e) {
  if (e.keyCode == 123) { // F12
    return false;
  }
  if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) {
    return false; // Ctrl+Shift+I or Ctrl+Shift+J
  }
  if (e.ctrlKey && e.keyCode == 85) {
    return false; // Ctrl+U
  }
  if (e.ctrlKey && e.keyCode == 67) {
    return false; // Ctrl+C
  }
  if (e.ctrlKey && e.keyCode == 83) {
    return false; // Ctrl+S
  }
};

