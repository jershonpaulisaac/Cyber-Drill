const allowCamBtn = document.getElementById('allowCamBtn');
const victimVideo = document.getElementById('victimVideo');
const hackerVideo = document.getElementById('hackerVideo');
const victimStatus = document.getElementById('victimStatus');
const hackerStatus = document.getElementById('hackerStatus');
const victimFakeSite = document.getElementById('victimFakeSite');

allowCamBtn.addEventListener('click', async () => {
  try {
    victimStatus.textContent = 'Requesting camera access...';
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Hacker sees the live feed
    hackerVideo.srcObject = stream;
    hackerStatus.textContent = 'Hacker is now viewing victim’s camera feed!';

    // Victim video is hidden after access granted
    victimVideo.style.display = 'none';
    victimFakeSite.style.display = 'block';
    victimStatus.textContent = 'will receive request soon...';

    // Disable button after granting
    allowCamBtn.disabled = true;
    allowCamBtn.textContent = 'Camera Access Granted';

  } catch (err) {
    victimStatus.textContent = 'Camera access denied or error occurred.';
    console.error(err);
  }
});
