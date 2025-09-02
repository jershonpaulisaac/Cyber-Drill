const startBtn = document.getElementById("startBtn");
const simulation = document.getElementById("simulation");
const spinnerContainer = document.getElementById("spinner-container");
const glitchText = document.getElementById("glitch-text");
const blackout = document.getElementById("blackout");
const modal = document.getElementById("agreementModal");
const proceedBtn = document.getElementById("proceedBtn");
const agreeCheck = document.getElementById("agreeCheck");
const freezeOverlay = document.getElementById("freezeOverlay");

// Show disclaimer modal
startBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Enable continue only if checkbox is checked
agreeCheck.addEventListener("change", () => {
  proceedBtn.disabled = !agreeCheck.checked;
  proceedBtn.classList.toggle("enabled", agreeCheck.checked);
});

// Proceed with simulation
proceedBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.querySelector(".main-content").style.display = "none";
  simulation.style.display = "flex";

  glitchText.style.display = "block";
  glitchText.textContent = "Connecting to the Onion Network...";
  spinnerContainer.style.display = "none";
  blackout.style.display = "none";

  // Show glitch text for 5 seconds
  setTimeout(() => {
    glitchText.style.display = "none";
    blackout.style.display = "flex";

    // After 1 second show alert popup
    setTimeout(() => {
      alert(
        "🛑 SECURITY WARNING\n" +
        "Unusual activity has been detected on your system.\n\n" +
        "• Unauthorized access attempt detected.\n" +
        "• Encrypted files found in system directories.\n" +
        "• Suspicious network behavior traced to your IP.\n\n" +
        "Action Required:\n" +
        "Press OK to acknowledge and continue."
      );

      blackout.style.display = "none";
      spinnerContainer.style.display = "flex";

      // Spinner for 3 seconds
      setTimeout(() => {
        spinnerContainer.style.display = "none";

        // Redirect to dark web replica page
        window.location.href = "dark_web_replica.html"; // <-- Replace with your replica URL
      }, 3000);

    }, 1000);
  }, 5000);
});

// Chaos simulation function (optional, runs before redirect)
function startUncontrolledSimulation() {
  let counter = 0;
  const interval = setInterval(() => {
    document.body.style.backgroundColor = counter % 2 === 0 ? "#000" : "#111";
    document.body.style.color = counter % 2 === 0 ? "#00ffcc" : "#ff003c";

    const text = document.createElement("div");
    text.className = "chaos-text";
    text.textContent = "⚠ SYSTEM BREACH ⚠";
    text.style.left = `${getRandomInt(0, window.innerWidth - 150)}px`;
    text.style.top = `${getRandomInt(0, window.innerHeight - 40)}px`;
    text.style.color = getRandomColor();
    text.style.fontSize = `${getRandomInt(14, 32)}px`;
    text.style.fontFamily = "Orbitron, monospace";
    document.body.appendChild(text);

    setTimeout(() => {
      if (text.parentElement) text.parentElement.removeChild(text);
    }, 2000);

    counter++;
    if (counter > 50) clearInterval(interval);
  }, 150);
}

// Helpers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  return '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('');
}

// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());
// Disable text selection & copy
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("cut", e => e.preventDefault());
// Disable certain key combos
document.onkeydown = function (e) {
  if (e.keyCode == 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) return false; // Ctrl+Shift+I/J
  if (e.ctrlKey && e.keyCode == 85) return false; // Ctrl+U
  if (e.ctrlKey && e.keyCode == 67) return false; // Ctrl+C
  if (e.ctrlKey && e.keyCode == 83) return false; // Ctrl+S
};
