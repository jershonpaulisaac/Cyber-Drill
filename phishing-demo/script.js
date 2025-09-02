document.getElementById("phishingForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent actual form submission

  // Open a new blank tab
  const newTab = window.open('', '_blank');

  if (newTab) {
    newTab.document.write(`
      <html>
        <head>
          <title>Security Breach</title>
          <style>
            body {
              margin: 0;
              background: black;
              overflow: hidden; /* Hide scrollbars */
              cursor: none;     /* Hide cursor */
            }
            video {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              object-fit: cover;
              z-index: 9999;
              pointer-events: none; /* Prevent right-click on video */
            }
          </style>
          <script>
            window.onload = function() {
              alert("⚠️ Security Breach Detected!");
              const vid = document.getElementById("fullscreenVideo");
              vid.play();
            };

            // Disable all mouse interactions
            ["contextmenu","mousedown","mouseup","click"].forEach(evt =>
              document.addEventListener(evt, e => e.preventDefault())
            );

            // Disable text selection & copy
            ["selectstart","copy","cut"].forEach(evt =>
              document.addEventListener(evt, e => e.preventDefault())
            );

            // Disable all keyboard inputs
            document.onkeydown = function(e) {
              e.preventDefault();
              return false;
            };
          </script>
        </head>
        <body>
          <video id="fullscreenVideo" 
                 autoplay 
                 playsinline 
                 muted 
                 disablepictureinpicture 
                 controlslist="nodownload nofullscreen noremoteplayback">
            <source src="video.mp4" type="video/mp4" />
          </video>
        </body>
      </html>
    `);
    newTab.document.close(); // Finalize tab load
  } else {
    alert("⚠️ Please allow pop-ups to see the simulation.");
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

