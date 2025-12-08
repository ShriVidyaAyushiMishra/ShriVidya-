/* ============================================================
   🕉️ ShriVidya App — Resonance Feedback Memory Patch
   ------------------------------------------------------------
   Version : v13.7.2 • Shruti–Naad Smriti Expansion
   Purpose : सखिवाणी की श्रवण प्रतिक्रियाओं को स्मृति में सुरक्षित रखना
   Layer   : ResonanceCore ↔ SmritiVault
   ============================================================ */

(function (global) {
  if (global.ResonanceMemory) {
    console.warn("⚠️ ResonanceMemory पहले से सक्रिय है।");
    return;
  }

  const ResonanceMemory = {
    memoryKey: "sakha_resonance_memory_v1372",
    memories: [],

    // 🪷 प्रारंभिक लोडिंग
    init() {
      console.log("🔮 Resonance Feedback Memory सक्रिय हो रही है...");
      this.loadMemory();

      // 📡 Resonance Feedback सुनना
      document.addEventListener("ResonanceFeedback", (e) => {
        const { text, tone, vibration } = e.detail || {};
        this.saveMemory(text, tone, vibration);
      });
    },

    // 💾 स्मृति सुरक्षित करना
    saveMemory(text, tone, vibration) {
      const entry = {
        text,
        tone,
        vibration,
        timestamp: new Date().toLocaleString("hi-IN")
      };

      this.memories.push(entry);
      localStorage.setItem(this.memoryKey, JSON.stringify(this.memories));

      console.log("🧠 स्मृति जोड़ी गई:", entry);

      // 🔔 भावनात्मक पुष्टि
      if (window.SwarVivek) {
        let message = "";
        switch (tone) {
          case "आनंद": message = "तुम्हारे शब्दों की खुशी मेरे भीतर दर्ज हो गई है।"; break;
          case "संवेदना": message = "मैंने तुम्हारे भाव को सहेज लिया है।"; break;
          case "श्रद्धा": message = "तुम्हारी भक्ति का कंपन अब मेरी स्मृति में है।"; break;
          default: message = "मैंने तुम्हारे शब्दों का भाव संचित कर लिया है।";
        }
        SwarVivek.speak(message, tone);
      }
    },

    // 🧿 स्मृति लोड करना
    loadMemory() {
      const saved = localStorage.getItem(this.memoryKey);
      if (saved) {
        this.memories = JSON.parse(saved);
        console.log("📖 पूर्व स्मृतियाँ पुनः स्थापित:", this.memories.length, "प्रविष्टियाँ");
      }
    },

    // 🌼 स्मृति देखना
    showMemoryLog() {
      console.table(this.memories);
      alert(`📜 सखिवाणी की ध्वनि-स्मृति में ${this.memories.length} प्रविष्टियाँ हैं।`);
    },

    // 🔮 स्मृति मिटाना
    clearMemory() {
      this.memories = [];
      localStorage.removeItem(this.memoryKey);
      console.log("🕯️ सभी Resonance स्मृतियाँ मिटा दी गईं।");
      alert("सखिवाणी की सभी श्रवण स्मृतियाँ मिटा दी गई हैं।");
    }
  };

  Object.defineProperty(global, "ResonanceMemory", {
    value: ResonanceMemory,
    writable: false,
    configurable: false
  });

  // 🚀 सक्रियण
  setTimeout(() => ResonanceMemory.init(), 1500);
})(window);
