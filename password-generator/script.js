const form = document.getElementById('passwordForm');
const numbersInput = document.getElementById('numbers');
const wordsInput = document.getElementById('words');
const lettersInput = document.getElementById('letters');
const difficultySelect = document.getElementById('difficulty');
const resultArea = document.getElementById('result');
const copyBtn = document.getElementById('copyBtn');

// Only these symbols are allowed
const SYMBOLS = "!@#$%^&*()_-+=\\{}|:;\"'<>,.?/";

function parseInput(str) {
  return str
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generatePassword() {
  const numbers = parseInput(numbersInput.value);
  const words = parseInput(wordsInput.value);
  const letters = parseInput(lettersInput.value);
  const difficulty = difficultySelect.value;

  // Combine all input to extract symbols
  const allInput = numbers.concat(words).concat(letters).join('');
  const userSymbols = [...new Set(allInput.split('').filter(ch => SYMBOLS.includes(ch)))];

  let pool = [];

  const repeat = difficulty === 'low' ? 1 : difficulty === 'medium' ? 2 : 3;

  // Add letters
  if (letters.length > 0) {
    for (let i = 0; i < repeat; i++) pool.push(...letters);
  }

  // Add numbers
  if (numbers.length > 0) {
    for (let i = 0; i < repeat; i++) pool.push(...numbers);
  }

  // Add words (only in medium and high)
  if (words.length > 0 && difficulty !== 'low') {
    pool.push(...words);
  }

  // Add user symbols only in medium and high
  if (difficulty !== 'low' && userSymbols.length > 0) {
    const symCount = difficulty === 'medium' ? 4 : 7;
    for (let i = 0; i < symCount; i++) {
      pool.push(userSymbols[Math.floor(Math.random() * userSymbols.length)]);
    }
  }

  if (pool.length === 0) {
    alert('Please enter at least one letter, number, or word.');
    return '';
  }

  pool = shuffleArray(pool);

  let passLength = difficulty === 'low' ? 8 : difficulty === 'medium' ? 14 : 20;

  let password = '';
  while (password.length < passLength) {
    const next = pool[Math.floor(Math.random() * pool.length)];
    password += next;
  }

  return password.length > passLength ? password.substring(0, passLength) : password;
}

form.addEventListener('submit', () => {
  const password = generatePassword();
  if (password) resultArea.value = password;
});

copyBtn.addEventListener('click', () => {
  if (!resultArea.value) return;
  navigator.clipboard.writeText(resultArea.value)
    .then(() => alert('Password copied to clipboard!'))
    .catch(() => alert('Failed to copy password.'));
});

// Input restrictions
const allowedSymbols = SYMBOLS.split('');

// Numbers: allow only digits and commas
numbersInput.addEventListener('input', () => {
  numbersInput.value = numbersInput.value.replace(/[^0-9,]/g, '');
});

// Words: allow only letters and commas
wordsInput.addEventListener('input', () => {
  wordsInput.value = wordsInput.value.replace(/[^a-zA-Z,]/g, '');
});

// Letters: allow only allowed symbols and commas
lettersInput.addEventListener('input', () => {
  const current = lettersInput.value.split('');
  lettersInput.value = current
    .filter(char => allowedSymbols.includes(char) || char === ',')
    .join('');
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

