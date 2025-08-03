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
