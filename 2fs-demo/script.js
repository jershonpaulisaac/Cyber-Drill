const startDemoBtn = document.getElementById("startDemoBtn");
const infoPage = document.getElementById("infoPage");
const formPage = document.getElementById("formPage");

const loginForm = document.getElementById("loginForm");
const otpForm = document.getElementById("otpForm");
const otpInput = document.getElementById("otpInput");
const loginPage = document.getElementById("loginPage");
const otpPage = document.getElementById("otpPage");
const messageBox = document.getElementById("messageBox");

let generatedOTP = '';

// On click of "Try This" button, switch from info page to form
startDemoBtn.addEventListener("click", () => {
  infoPage.style.display = "none";
  formPage.style.display = "block";
});

// Handle login form
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username && password) {
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    alert("Your OTP is: " + generatedOTP);
    loginPage.style.display = "none";
    otpPage.style.display = "block";
  }
});

// Handle OTP form
otpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const enteredOTP = otpInput.value.trim();

  if (enteredOTP === generatedOTP) {
    messageBox.style.color = "green";
    messageBox.textContent = "✅ Login successful. Welcome!";
    otpPage.style.display = "none";
  } else {
    messageBox.style.color = "red";
    messageBox.textContent = "❌ Incorrect OTP. Try again.";
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

