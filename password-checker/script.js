const passwordInput = document.getElementById("password");
const strengthBarFill = document.getElementById("strength-bar-fill");
const strengthText = document.getElementById("strength-text");
const copyBtn = document.getElementById("copyBtn");

const criteria = {
  length: document.getElementById("length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  number: document.getElementById("number"),
  special: document.getElementById("special"),
};

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  // Check criteria
  const checks = {
    length: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
  };

  // Update criteria UI
  for (const key in checks) {
    if (checks[key]) {
      criteria[key].classList.add("valid");
      criteria[key].classList.remove("invalid");
    } else {
      criteria[key].classList.add("invalid");
      criteria[key].classList.remove("valid");
    }
  }

  // Calculate score
  let score = 0;
  for (const key in checks) {
    if (checks[key]) score++;
  }

  // Update strength bar & text
  const percent = (score / 5) * 100;
  strengthBarFill.style.width = percent + "%";

  let color = "red";
  let text = "Very Weak";

  if (score === 1) {
    color = "#ff4b5c";
    text = "Very Weak";
  } else if (score === 2) {
    color = "#ff7f50";
    text = "Weak";
  } else if (score === 3) {
    color = "#ffa500";
    text = "Moderate";
  } else if (score === 4) {
    color = "#9acd32";
    text = "Strong";
  } else if (score === 5) {
    color = "#4caf50";
    text = "Very Strong";
  }

  strengthBarFill.style.backgroundColor = color;
  strengthText.textContent = "Strength: " + text;
});

// Copy password to clipboard
copyBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  if (!password) {
    alert("Please enter a password first.");
    return;
  }

  navigator.clipboard.writeText(password).then(() => {
    copyBtn.textContent = "✔️";
    setTimeout(() => {
      copyBtn.textContent = "📋";
    }, 1500);
  }).catch(() => {
    alert("Failed to copy! Please try again.");
  });
});
const togglePasswordBtn = document.getElementById("togglePassword");

togglePasswordBtn.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle icon
  togglePasswordBtn.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
});
