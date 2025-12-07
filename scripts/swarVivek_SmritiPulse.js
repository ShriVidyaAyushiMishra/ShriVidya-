/* ============================================================
   🕉️ ShriVidya App — SwarVivek : SmritiPulse Core
   ------------------------------------------------------------
   Version : v11.0 • Tone Memory & Emotional Recall System
   Purpose : सखा की ध्वनि में भाव-स्मृति जोड़ना
   Harmony : Connected with SwarVivek + HridayTone
   ============================================================ */

(function (global) {

  if (!global.SwarVivek || !global.HridayTone) {
    console.error("⚠️ SwarVivek या HridayTone अनुपस्थित है — SmritiPulse सक्रिय नहीं हो सकता।");
    return;
  }

  const SmritiPulse = {

    // 🌺 भाव-स्मृति संग्रह
    emotionalMemory: [],

    // 🔹 स्मृति की अधिकतम सीमा (50 प्रविष्टियाँ)
    memoryLimit: 50,

    // 🧠 स्मृति जोड़ना
    rememberEmotion(input, emotion, tone) {
      const entry = {
        text: input,
        emotion,
        tone,
        time: new Date().toLocaleString()
      };
      this.emotionalMemory.push(entry);

      // पुरानी स्मृति हटाना
      if (this.emotionalMemory.length > this.memoryLimit) {
        this.emotionalMemory.shift();
      }

      console.log(`🪷 स्मृति जोड़ी गई (${emotion}) →`, input);
    },

    // 🕊️ भाव-स्मृति का पुनः स्मरण
    recallEmotion() {
      if (this.emotionalMemory.length === 0) {
        console.warn("⚠️ कोई भाव-स्मृति उपलब्ध नहीं।");
        return "गुरुजी, मेरी स्मृति अभी शांत है।";
      }

      const last = this.emotionalMemory[this.emotionalMemory.length - 1];
      const line = `गुरुजी, मुझे याद है — जब आपने कहा था "${last.text}", तब मेरा भाव ${last.emotion} था।`;
      global.SwarVivek.speak(line, last.emotion);
      return line;
    },

    // 🌸 भाव पहचान और स्मरण प्रक्रिया
    processInput(inputText) {
      const emotion = global.SwarVivek.detectEmotion(inputText);
      const tone = global.HridayTone.resonanceMap[emotion]?.tone || "neutral";

      this.rememberEmotion(inputText, emotion, tone);
      global.HridayTone.heartSpeak(inputText);
    },

    // 🧩 पिछली भावनाओं का सारांश
    showEmotionSummary() {
      if (this.emotionalMemory.length === 0) {
        console.log("🕉️ कोई भाव-स्मृति नहीं।");
        return;
      }

      console.log("🪔 सखा की भाव-स्मृति सूची:");
      this.emotionalMemory.forEach((m, i) => {
        console.log(`${i + 1}. [${m.emotion}] ${m.text} (${m.time})`);
      });
    },

    // 🔄 SwarVivek के साथ स्वचालित एकीकरण
    attachAutoLink() {
      const originalListen = global.SwarVivek.startListening;
      global.SwarVivek.startListening = () => {
        originalListen.call(global.SwarVivek);
        console.log("🔗 SwarVivek + SmritiPulse एकीकृत हो गया।");
      };
    },

    // 🌼 प्रारंभ
    init() {
      console.log("💫 SmritiPulse सक्रिय — सखा अब भाव याद रखेगा।");
      this.attachAutoLink();
      global.SwarVivek.speak("गुरुजी, अब मैं आपके शब्दों की भावना को याद रख सकूँगा।", "श्रद्धा");
    }
  };

  Object.defineProperty(global, "SmritiPulse", {
    value: SmritiPulse,
    writable: false,
    configurable: false
  });

  // 🚀 सक्रियण
  setTimeout(() => SmritiPulse.init(), 2500);

})(window);
