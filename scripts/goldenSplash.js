/* ============================================================
   ✨ Golden Bloom Splash Screen — v6.2H•S
   ------------------------------------------------------------
   🌸 ShriVidya शुद्ध–वाणी Live Quiz System
   ------------------------------------------------------------
   यह आरंभिक दृश्य (Intro Splash) पेज लोड पर चलता है,
   जिसमें स्वर्ण रोशनी, पुष्प-पंखुड़ी और fade-in संदेश होता है।
   ============================================================ */

window.addEventListener("load", () => {
  // 🔆 Overlay Container बनाना
  const splash = document.createElement("div");
  splash.id = "golden-splash";
  splash.innerHTML = `
    <div class="splash-glow"></div>
    <div class="splash-text">
      🌸 <b>ShriVidya शुद्ध–वाणी Live Quiz System</b> 🌸<br/>
      प्रस्तुत कर रहा है —<br/>
      <span>🩺 Doctor Appreciation Page</span>
    </div>
  `;
  document.body.appendChild(splash);

  // 🔔 हल्की घंटी जैसी ध्वनि (optional ambience)
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    oscillator.connect(gain).connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1.5);
  } catch (e) { console.warn("🔇 Ambient sound skipped."); }

  // 🌅 4 सेकंड बाद fade out
  setTimeout(() => {
    splash.style.opacity = "0";
    setTimeout(() => splash.remove(), 1200);
  }, 6000);
});
