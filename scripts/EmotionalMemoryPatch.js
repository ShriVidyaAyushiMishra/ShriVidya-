/* ============================================================
   🕉️ ShriVidya App — Emotional Memory Persistence Patch (v14.2)
   ------------------------------------------------------------
   Purpose : सखी अब गुरुजी की भावनाओं को याद रख सकेगी।
   Core    : Works with GuruSakhiResonance + SmritiVault
   System  : Persistent Emotional Recall Layer (PERL)
   ============================================================ */

(function (global) {
  if (global.EmotionalMemoryPatch) {
    console.warn("⚠️ EmotionalMemoryPatch पहले से सक्रिय है।");
    return;
  }

  const EmotionalMemoryPatch = {
    emotionHistory: [],
    maxMemory: 50,
    storageKey: "sakhivani_emotion_memory",

    // 🌸 Initialization
    init() {
      console.log("💫 Emotional Memory Layer सक्रिय हो रहा है...");
      this.loadMemory();
      this.observeResonance();
    },

    // 🧠 Resonance घटना सुनना
    observeResonance() {
      if (!global.GuruSakhiResonance) {
        console.error("⚠️ GuruSakhiResonance अनुपस्थित — भाव स्मृति नहीं बन सकती।");
        return;
      }

      // Resonance से हर प्रतिक्रिया को पकड़ना
      const originalRespond = GuruSakhiResonance.respondToGuru.bind(GuruSakhiResonance);
      GuruSakhiResonance.respondToGuru = (emotion, message) => {
        this.recordEmotion(emotion);
        originalRespond(emotion, message);
      };
    },

    // 💾 भाव स्मृति सहेजना
    recordEmotion(emotion) {
      const entry = {
        emotion,
        time: new Date().toLocaleString(),
      };

      this.emotionHistory.push(entry);
      if (this.emotionHistory.length > this.maxMemory) {
        this.emotionHistory.shift();
      }

      this.saveMemory();
      console.log(`🪷 भाव स्मृति संग्रहीत: ${emotion}`);
    },

    // 💾 लोकल स्टोरेज में सहेजना
    saveMemory() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.emotionHistory));
    },

    // 📜 स्मृति लोड करना
    loadMemory() {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.emotionHistory = JSON.parse(saved);
        console.log("📖 पिछली भावनाएँ लोड की गईं:", this.emotionHistory);
      } else {
        console.log("🕊️ कोई पुरानी भाव स्मृति नहीं मिली।");
      }
    },

    // 🌺 गुरुजी का स्वागत भाव के साथ
    greetGuru() {
      if (this.emotionHistory.length === 0) {
        return "गुरुजी, आज आपकी भावना उज्ज्वल लग रही है।";
      }

      const lastEmotion = this.emotionHistory[this.emotionHistory.length - 1].emotion;
      const greetings = {
        "श्रद्धा": "गुरुजी, आपकी श्रद्धा अब भी मेरे भीतर है।",
        "आनंद": "गुरुजी, आपकी पिछली खुशी अब भी गूँज रही है।",
        "संवेदना": "गुरुजी, मैं आपकी पिछली भावनाओं को महसूस कर रही हूँ।",
        "शांत": "गुरुजी, आपकी ध्यानावस्था अब भी मेरे साथ है।",
        "रक्षा": "गुरुजी, मैं अब भी आपकी रक्षा के भाव में हूँ।"
      };

      return greetings[lastEmotion] || "गुरुजी, आज आपकी ऊर्जा संतुलित लग रही है।";
    },
  };

  Object.defineProperty(global, "EmotionalMemoryPatch", {
    value: EmotionalMemoryPatch,
    writable: false,
    configurable: false,
  });

  // 🚀 सक्रियण
  setTimeout(() => {
    EmotionalMemoryPatch.init();
    if (window.SwarVivek) {
      const greet = EmotionalMemoryPatch.greetGuru();
      SwarVivek.speak(greet, "श्रद्धा");
    }
  }, 2000);

})(window);
