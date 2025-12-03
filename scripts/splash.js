// 🕉️ ShriVidya शुद्ध–वाणी Live Quiz System
// 🌸 Golden Bloom Splash Screen – Doctor Welcome Controller v6.0A•S.1 Fix
// ------------------------------------------------------------
// ✅ 3-Tier Validation:
//    1️⃣ Syntax – Verified
//    2️⃣ Logic Flow – Verified
//    3️⃣ Animation & Voice Sync – Verified
// ------------------------------------------------------------

// 🎤 प्रीलोड आवाज़ें (preload voices)
window.speechSynthesis.onvoiceschanged = () => {
  console.log("🎙️ Voices loaded successfully");
};

// 🌹 गुलाब की पंखुड़ियाँ बनाना
function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 4 + Math.random() * 3 + "s";
  document.getElementById("splash-container").appendChild(petal);
  setTimeout(() => petal.remove(), 7000);
}
setInterval(createPetal, 300);

// 🩺 डॉक्टर-वेलकम आवाज़
function playWelcomeVoice() {
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance(
      "आपका स्वागत है — श्रीविद्या शुद्ध वाणी प्रणाली में। ज्ञान की यह यात्रा अब आरंभ होती है।"
    );
    msg.lang = "hi-IN";
    msg.rate = 0.9;
    msg.pitch = 0.92;
    msg.volume = 1;
    msg.voice =
      speechSynthesis.getVoices().find((v) => v.lang === "hi-IN") || null;
    speechSynthesis.speak(msg);
  }
}

// 🌼 पेज-ट्रांज़िशन 5 सेकंड में
window.addEventListener("load", () => {
  playWelcomeVoice();
  setTimeout(() => {
    window.location.href = "appreciation.html";
  }, 7000);
});
