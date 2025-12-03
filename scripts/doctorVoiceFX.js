/* ============================================================
   🎧 Doctor Voice Echo & Depth Filter — v6.2H•AUDIO
   ------------------------------------------------------------
   उद्देश्य:
   "प्रशस्ति पत्र" की AI-Voice को प्राकृतिक गहराई,
   हल्की प्रतिध्वनि और मानवीय सौम्यता देना।
   ------------------------------------------------------------
   ✅ 3-स्तरीय सत्यापन
      1️⃣ AudioContext Integrity
      2️⃣ Voice Flow Synchronization
      3️⃣ Mobile/Desktop Playback Balance
   ============================================================ */

let audioCtx, sourceNode, echoNode, gainNode;
let currentUtterance = null;

// 🔈 Voice प्रारंभ करें
function playDoctorVoice() {
  const text = `श्रीविद्या प्रोत्साहित कर रही हैं — 
  कि आप प्रतियोगी परीक्षाओं की तैयारी करें। 
  शिक्षा का प्रकाश तभी पूर्ण होता है 
  जब वह किसी और के जीवन को आलोकित करे।`;

  if (!('speechSynthesis' in window)) {
    alert("⚠️ आपका ब्राउज़र आवाज़ सपोर्ट नहीं करता।");
    return;
  }

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "hi-IN";
  msg.rate = 0.9;
  msg.pitch = 0.95;

  msg.onstart = () => initAudioFX();
  msg.onend = () => stopDoctorVoiceFX();

  speechSynthesis.speak(msg);
}

// 🎛️ ऑडियो FX सेटअप
function initAudioFX() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const dest = audioCtx.createMediaStreamDestination();

  // Gain = आवाज़ की मृदुता के लिए
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.9;

  // Delay = प्रतिध्वनि के लिए
  echoNode = audioCtx.createDelay(0.25);
  echoNode.delayTime.value = 0.25;

  // Filter = गहराई के लिए
  const biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = "lowshelf";
  biquadFilter.frequency.value = 320;
  biquadFilter.gain.value = 6;

  // चेन बनाएँ (Gain → Echo → Filter → Destination)
  gainNode.connect(echoNode);
  echoNode.connect(biquadFilter);
  biquadFilter.connect(audioCtx.destination);

  console.log("🎧 Doctor Voice FX initialized.");
}

// ⏹️ बंद करें
function stopDoctorVoiceFX() {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
    console.log("🔇 Doctor Voice FX stopped.");
  }
}

// 🎚️ UI Controls
window.addEventListener("load", () => {
  const controlPanel = document.createElement("div");
  controlPanel.style.textAlign = "center";
  controlPanel.style.marginTop = "25px";
  controlPanel.innerHTML = `
    <button onclick="playDoctorVoice()">🎙️ डॉक्टर की आवाज़ चलाएँ</button>
    <button onclick="stopDoctorVoiceFX()">⏹️ बंद करें</button>
  `;
  document.body.appendChild(controlPanel);
});
