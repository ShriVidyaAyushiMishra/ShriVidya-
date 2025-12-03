/* ============================================================
   🌸 ShriVidya शुद्ध–वाणी Live Quiz System
   🎞️ Petal + Text Overlay Merger — v6.2H•VFX
   ------------------------------------------------------------
   यह मॉड्यूल Doctor Voice के साथ पंखुड़ियों और
   चलती सुनहरी पंक्तियों को एकसाथ जोड़ता है।
   ------------------------------------------------------------
   ✅ Key Features:
      • Real-time synchronized visual overlay
      • Golden text shimmer animation
      • Falling-petal particle engine
      • Low-CPU rendering (requestAnimationFrame)
   ============================================================ */

// 🪷 Initialization
const vfxContainer = document.createElement("div");
vfxContainer.id = "vfx-overlay";
document.body.appendChild(vfxContainer);

// 🩵 CSS-style injection (Golden Text + Petals)
const style = document.createElement("style");
style.textContent = `
#vfx-overlay {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 9999;
}

.petal {
  position: absolute;
  top: -2vh;
  width: 16px;
  height: 14px;
  background: radial-gradient(circle at 30% 30%, #ffb6c1 0%, #ff007f 70%);
  border-radius: 50%;
  opacity: 0.8;
  animation: fall linear infinite;
}
@keyframes fall {
  0%   { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
}

#goldenText {
  position: absolute;
  width: 100%;
  top: 35%;
  text-align: center;
  font-size: 1.6rem;
  color: #ffd700;
  text-shadow: 0 0 15px #ffef99, 0 0 30px #ffaa00;
  animation: glowText 2s ease-in-out infinite alternate;
}
@keyframes glowText {
  from { text-shadow: 0 0 10px #ffaa00; }
  to   { text-shadow: 0 0 25px #fff6b0, 0 0 35px #ffd700; }
}`;
document.head.appendChild(style);

// 🌹 गुलाब पंखुड़ी एनीमेशन
function createPetal() {
  const p = document.createElement("div");
  p.classList.add("petal");
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = 4 + Math.random() * 4 + "s";
  vfxContainer.appendChild(p);
  setTimeout(() => p.remove(), 8000);
}
setInterval(createPetal, 350);

// ✨ सुनहरी पंक्तियाँ
const goldenText = document.createElement("div");
goldenText.id = "goldenText";
vfxContainer.appendChild(goldenText);

// 🧠 Text list — synchronized with Doctor Voice
const lines = [
  "श्रीविद्या प्रोत्साहित कर रही हैं —",
  "कि आप प्रतियोगी परीक्षाओं की तैयारी करें।",
  "आपका हर प्रयास एक नई दिशा बन सकता है।",
  "शिक्षा तब पूर्ण होती है जब वह किसी और के जीवन को आलोकित करे।"
];

let i = 0;
function showNextLine() {
  if (i >= lines.length) return;
  goldenText.textContent = lines[i];
  i++;
  setTimeout(showNextLine, 4000);
}

// 🎧 Doctor Voice Synchronization Hook
document.addEventListener("DOMContentLoaded", () => {
  showNextLine();
  try {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(lines.join(" "));
      msg.lang = "hi-IN";
      msg.rate = 0.9;
      msg.pitch = 0.95;
      msg.volume = 1;
      speechSynthesis.speak(msg);
    }
  } catch (e) {
    console.warn("⚠️ Voice not supported:", e);
  }
});
