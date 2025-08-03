const startBtn = document.getElementById("startBtn");
const simulation = document.getElementById("simulation");
const spinnerContainer = document.getElementById("spinner-container");
const glitchText = document.getElementById("glitch-text");
const blackout = document.getElementById("blackout");
const modal = document.getElementById("agreementModal");
const proceedBtn = document.getElementById("proceedBtn");
const agreeCheck = document.getElementById("agreeCheck");
const freezeOverlay = document.getElementById("freezeOverlay");
const beep = document.getElementById("beep");
const fullscreenVideo = document.getElementById("fullscreenVideo");

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

  // Initially show glitch text, hide spinner, blackout, and video
  glitchText.style.display = "block";
  glitchText.textContent = "Connecting to the Onion Network...";
  spinnerContainer.style.display = "none";
  blackout.style.display = "none";
  fullscreenVideo.style.display = "none";

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

      // Show spinner AFTER alert is closed
      blackout.style.display = "none";
      spinnerContainer.style.display = "flex";

      // Show spinner for 3 seconds
      setTimeout(() => {
        spinnerContainer.style.display = "none";

        // Show and play the fullscreen video in full screen
        fullscreenVideo.style.display = "block";

        // Request fullscreen
        if (fullscreenVideo.requestFullscreen) {
          fullscreenVideo.requestFullscreen();
        } else if (fullscreenVideo.webkitRequestFullscreen) {
          fullscreenVideo.webkitRequestFullscreen(); // Safari
        } else if (fullscreenVideo.msRequestFullscreen) {
          fullscreenVideo.msRequestFullscreen(); // IE11
        }

        // Play the video
        fullscreenVideo.play();

        // When video ends, hide it and start chaos simulation
        fullscreenVideo.onended = () => {
          fullscreenVideo.style.display = "none";
          startUncontrolledSimulation();
        };
      }, 3000);
    }, 1000);
  }, 5000);
});

// Chaos simulation function
function startUncontrolledSimulation() {
  let counter = 0;

  const interval = setInterval(() => {
    // Flicker background and text
    document.body.style.backgroundColor = counter % 2 === 0 ? "#000" : "#fff";
    document.body.style.color = counter % 2 === 0 ? "#fff" : "#000";

    // Create random warning text
    const text = document.createElement("div");
    text.className = "chaos-text";
    text.textContent = "⚠ SYSTEM BREACH ⚠";
    text.style.left = `${getRandomInt(0, window.innerWidth - 150)}px`;
    text.style.top = `${getRandomInt(0, window.innerHeight - 40)}px`;
    text.style.color = getRandomColor();
    text.style.fontSize = `${getRandomInt(14, 32)}px`;
    text.style.fontFamily = "Orbitron, monospace";
    document.body.appendChild(text);

    // Remove text after 2s
    setTimeout(() => {
      if (text.parentElement) {
        text.parentElement.removeChild(text);
      }
    }, 2000);

    // Play beep
    if (beep) {
      beep.currentTime = 0;
      beep.play().catch(() => {});
    }

    counter++;
    if (counter > 50) {
      clearInterval(interval);
      document.body.style.backgroundColor = "#0a0f1a";
      document.body.style.color = "#00ffcc";
      document.body.style.transform = "none";

      // Clean up
      document.querySelectorAll('.chaos-text').forEach(el => el.remove());

      // Optionally reload
      // location.reload();
    }
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
