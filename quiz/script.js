function startQuiz() {
  // Redirects to W3Schools Cybersecurity Quiz
  window.location.href = "https://www.w3schools.com/quiztest/quiztest.php?qtest=CYBERSECURITY";
}
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

