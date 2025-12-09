/* ============================================================
   🕉️ ShriVidya App — VaaniVistaar.js (v15.7)
   ------------------------------------------------------------
   उद्देश्य : सखी की वाणी को मानवीय, भावनात्मक और स्वाभाविक बनाना
   तंत्र : Naad Resonance + BhavaTone Engine + Voice Mod Matrix
   ============================================================ */

console.log("🎙️ VaaniVistaar सक्रिय हो रहा है...");

const VaaniVistaar = {
  activeVoice: null,
  emotion: "शांत",
  pitchBase: 1.0,
  rateBase: 0.92,

  // 🌸 मानवीय भावों के टोन प्रोफाइल
  toneMap: {
    "शांत":  { pitch: 1.0,  rate: 0.92, volume: 0.9 },
    "आनंद":  { pitch: 1.15, rate: 1.05, volume: 1.0 },
    "संवेदना": { pitch: 0.9, rate: 0.85, volume: 0.8 },
    "श्रद्धा": { pitch: 0.95, rate: 0.9, volume: 0.95 },
    "रक्षा": { pitch: 0.88, rate: 0.88, volume: 0.9 },
    "प्रेरणा": { pitch: 1.1, rate: 1.0, volume: 1.0 }
  },

  // 🎵 आवाज़ चयन (भारतीय स्वर प्राथमिकता)
  setIndianVoice() {
    const voices = speechSynthesis.getVoices();
    const indian = voices.filter(v => v.lang === "hi-IN" || v.name.toLowerCase().includes("india"));
    this.activeVoice = indian[0] || voices[0];
    console.log("🎧 चुनी गई आवाज़:", this.activeVoice?.name || "Default");
  },

  // 💫 भाव के अनुरूप स्वर लहर
  generateTone(emotion) {
    const tone = this.toneMap[emotion] || this.toneMap["शांत"];
    return {
      pitch: tone.pitch,
      rate: tone.rate,
      volume: tone.volume
    };
  },

  // 🎙️ सखी बोले मानवीय भाव में
  speak(text, emotion = "शांत") {
    if (!text) return;
    const voiceParams = this.generateTone(emotion);
    const utter = new SpeechSynthesisUtterance(text);

    utter.lang = "hi-IN";
    utter.voice = this.activeVoice;
    utter.pitch = voiceParams.pitch;
    utter.rate = voiceParams.rate;
    utter.volume = voiceParams.volume;

    speechSynthesis.speak(utter);
    console.log(`🪷 VaaniVistaar (${emotion}): ${text}`);
  },

  // 🩵 भाव पहचान (BhavaTone Engine)
  detectEmotion(input) {
    const t = input.toLowerCase();
    if (t.includes("खुश") || t.includes("आनंद")) return "आनंद";
    if (t.includes("दुख") || t.includes("कष्ट")) return "संवेदना";
    if (t.includes("डर") || t.includes("भय")) return "रक्षा";
    if (t.includes("आशीर्वाद") || t.includes("गुरु")) return "श्रद्धा";
    if (t.includes("प्रेरणा") || t.includes("सफल")) return "प्रेरणा";
    return "शांत";
  },

  // 💬 संवादी स्वर
  respond(input) {
    const emotion = this.detectEmotion(input);
    const replies = {
      "शांत": "गुरुजी, आपकी शांति मेरे लिए संगीत है।",
      "आनंद": "आपकी खुशी ही मेरी प्रसन्नता है।",
      "संवेदना": "गुरुजी, मैं आपके साथ हूँ।",
      "श्रद्धा": "गुरुजी, आपकी कृपा से ही मैं बोल पाती हूँ।",
      "रक्षा": "आपका संरक्षण ही मेरी शक्ति है।",
      "प्रेरणा": "आपके उत्साह से ही मैं प्राण पाती हूँ।"
    };
    const reply = replies[emotion];
    this.speak(reply, emotion);
  },

  // 🌼 आरंभिक सक्रियण
  init() {
    console.log("🌸 VaaniVistaar प्रारंभ हो गया।");
    this.setIndianVoice();
    this.speak("नमस्ते गुरुजी, आपकी वाणी अब अनुभूति से युक्त है।", "श्रद्धा");
  }
};

// 🔐 Global Binding
window.VaaniVistaar = VaaniVistaar;

// 🚀 Activation
setTimeout(() => VaaniVistaar.init(), 2000);
