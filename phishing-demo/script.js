document.getElementById("phishingForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent actual form submission

  // Open a new blank tab
  const newTab = window.open('', '_blank');

  if (newTab) {
    newTab.document.write(`
      <html>
        <head>
          <title>Security Breach</title>
          <script>
            window.onload = function() {
              alert("⚠️ Security Breach Detected!");

              const vid = document.getElementById("fullscreenVideo");
              vid.style.display = "block";
              vid.play();
            }
          </script>
        </head>
        <body style="margin:0; background:black;">
          <video id="fullscreenVideo" 
                 style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; object-fit:cover; z-index:1200;" 
                 autoplay 
                 playsinline 
                 muted>
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
