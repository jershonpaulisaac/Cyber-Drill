// Encrypt function
function encrypt() {
  const plainText = document.getElementById("plaintext").value;
  try {
    const cipherText = btoa(plainText); // Base64 encode
    document.getElementById("ciphertext").value = cipherText;
  } catch (e) {
    document.getElementById("ciphertext").value = "Error encoding text!";
  }
}

// Decrypt function
function decrypt() {
  const cipherText = document.getElementById("decodeInput").value;
  try {
    const plainText = atob(cipherText); // Base64 decode
    document.getElementById("decryptedText").value = plainText;
  } catch (e) {
    document.getElementById("decryptedText").value = "Invalid Cipher Text!";
  }
}

// Copy buttons functionality
function copyText(elementId) {
  const text = document.getElementById(elementId).value;
  navigator.clipboard.writeText(text)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Copy failed!"));
}

// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable text selection & manual copy/cut
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("copy", e => {
  if (!e.isTrusted) e.preventDefault(); // allow programmatic copy
});
document.addEventListener("cut", e => e.preventDefault());

// Disable certain key combos
document.onkeydown = function (e) {
  if (e.keyCode === 123) return false; // F12
  if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) return false; // Ctrl+Shift+I/J
  if (e.ctrlKey && [83, 85].includes(e.keyCode)) return false; // Ctrl+S, Ctrl+U
  if (e.ctrlKey && e.keyCode === 67) return false; // Ctrl+C
};
