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
