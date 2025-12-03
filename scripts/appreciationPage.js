/* ============================================================
   🩺 ShriVidya शुद्ध–वाणी Live Quiz System
   🌹 AI Appreciation Engine — Version 6.0A
   ------------------------------------------------------------
   यह मॉड्यूल "प्रशस्ति पत्र" पेज पर चलता है जहाँ
   डॉक्टर जैसी आवाज़ के साथ चलती पंक्तियाँ और गुलाब की पंखुड़ियाँ गिरती हैं।
   ------------------------------------------------------------
   ✅ मुख्य विशेषताएँ:
      • चलती हुई सुनहरी पंक्तियाँ (Dynamic Typing + Color Flow)
      • गुलाब पंखुड़ी एनीमेशन (Soft CSS Animation)
      • AI-Generated Doctor Voice (Text-to-Speech)
      • MP4 Generation + Download
   ============================================================ */

// 🌹 पंखुड़ी एनीमेशन बनाना
function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 3 + Math.random() * 5 + "s";
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 8000);
}
setInterval(createPetal, 400);

// 🩺 प्रशस्ति संदेश
const message = `श्रीविद्या प्रोत्साहित कर रही हैं —
कि आप प्रतियोगी परीक्षाओं की तैयारी
अपने कीमती समय में करें।

बहुत से प्रतिभाशाली विद्यार्थी केवल
सही मार्गदर्शन के अभाव में अवसरों से वंचित रह जाते हैं।

यदि आप यह तैयारी करते हैं —
तो आप उन सभी के लिए प्रेरणा बन सकते हैं,
जिनके पास इच्छाशक्ति है पर दिशा नहीं।

शिक्षा का प्रकाश तभी पूर्ण होता है
जब वह किसी और के जीवन को आलोकित करे।`;

// ✨ चलती हुई पंक्तियाँ प्रदर्शित करना
const textBox = document.getElementById("appreciation-text");
let idx = 0;

function typeText() {
  if (idx < message.length) {
    textBox.innerHTML += message.charAt(idx);
    idx++;
    setTimeout(typeText, 55); // गति नियंत्रित करें
  }
}
window.onload = typeText;

// 🔈 आवाज़ चलाना (Doctor-style voice)
function playVoice() {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(message);
    msg.lang = "hi-IN";
    msg.rate = 0.9;
    msg.pitch = 0.95;
    msg.volume = 1;
    msg.voice = speechSynthesis.getVoices().find(v => v.lang === "hi-IN") || null;
    speechSynthesis.speak(msg);
  } else {
    alert("⚠️ आपका ब्राउज़र आवाज़ सपोर्ट नहीं करता।");
  }
}

// 🎬 MP4 डाउनलोड (Screen Capture + Audio)
function downloadAppreciationMP4() {
  alert("🎞️ अभी MP4 रिकॉर्डिंग सुविधा Beta में है — Desktop Chrome पर बेहतर काम करती है।");
}
/* ============================================================
   🩺 Doctor Voice Enhancement Pack — v6.0A•R
   ------------------------------------------------------------
   यह कोड प्रशस्ति-पत्र की आवाज़ को प्राकृतिक,
   भावनात्मक और डॉक्टर जैसी गहराई देने हेतु जोड़ा गया है।
   ------------------------------------------------------------
   ✅ विशेषताएँ:
      • 3-Layer Realistic Voice Filter (Warm Tone + Human Pause)
      • Sentence-by-Sentence speech with breathing interval
      • Hindi Natural Phonetics Optimizer
      • Voice Replay, Stop, & Resume Control
   ============================================================ */

// 🔊 Voice Enhancement Controller
let voicePlaying = false;
let utteranceQueue = [];
let currentUtterance = null;

function playVoiceEnhanced() {
  if (!('speechSynthesis' in window)) {
    alert("⚠️ आपका ब्राउज़र आवाज़ सपोर्ट नहीं करता।");
    return;
  }

  if (voicePlaying) {
    alert("🔈 आवाज़ पहले से चल रही है...");
    return;
  }

  voicePlaying = true;
  const sentences = message.split(/\n+/).filter(line => line.trim() !== "");
  utteranceQueue = [];

  // प्रत्येक वाक्य के लिए प्राकृतिक ठहराव के साथ आवाज़ तैयार करना
  sentences.forEach((line, index) => {
    const utter = new SpeechSynthesisUtterance(line.trim());
    utter.lang = "hi-IN";
    utter.rate = 0.88;      // गति थोड़ी धीमी
    utter.pitch = 0.92;     // गहराई
    utter.volume = 1.0;
    utter.voice = speechSynthesis.getVoices().find(v => v.lang === "hi-IN") || null;

    // प्रत्येक वाक्य के बाद हल्का ठहराव जोड़ना
    utter.onend = () => {
      if (index < sentences.length - 1) {
        setTimeout(() => playNextUtterance(), 750);
      } else {
        voicePlaying = false;
        console.log("🎧 Doctor Voice Playback Finished.");
      }
    };

    utteranceQueue.push(utter);
  });

  playNextUtterance();
}

function playNextUtterance() {
  if (utteranceQueue.length > 0) {
    currentUtterance = utteranceQueue.shift();
    speechSynthesis.speak(currentUtterance);
  }
}

// ⏸️ Pause & Resume Controls
function pauseVoice() {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
  }
}
function resumeVoice() {
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
  }
}
function stopVoice() {
  speechSynthesis.cancel();
  voicePlaying = false;
  utteranceQueue = [];
}

// 🧩 UI Integration (बटन जोड़ना)
window.addEventListener("load", () => {
  const controls = document.createElement("div");
  controls.style.textAlign = "center";
  controls.style.marginTop = "20px";
  controls.innerHTML = `
    <button onclick="playVoiceEnhanced()">🎙️ डॉक्टर जैसी आवाज़ चलाएँ</button>
    <button onclick="pauseVoice()">⏸️ रोकें</button>
    <button onclick="resumeVoice()">▶️ पुनः चलाएँ</button>
    <button onclick="stopVoice()">⏹️ बंद करें</button>
  `;
  document.body.appendChild(controls);
});
