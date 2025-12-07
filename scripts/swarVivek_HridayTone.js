/* ============================================================
   🕉️ ShriVidya App — SwarVivek : HridayTone Resonance Engine
   ------------------------------------------------------------
   Version : v10.9.3 • HridayTone Core
   Purpose : स्वर में मानवीय भावनाओं की धड़कन और ऊर्जा जोड़ना
   Harmony : Linked with SwarVivek v10.9 (AkhandVaani Core)
   ============================================================ */

(function (global) {

  if (!global.SwarVivek) {
    console.error("⚠️ SwarVivek Core अनुपस्थित है — HridayTone सक्रिय नहीं हो सकता।");
    return;
  }

  const HridayTone = {

    // 🌸 भाव कंपन तालिका (Emotion Resonance Map)
    resonanceMap: {
      "श्रद्धा": { vibrato: 0.004, depth: 0.8, tone: "soft gold" },
      "आनंद": { vibrato: 0.006, depth: 0.9, tone: "bright saffron" },
      "संवेदना": { vibrato: 0.003, depth: 0.7, tone: "silver blue" },
      "रक्षा": { vibrato: 0.005, depth: 0.8, tone: "deep red" },
      "शांत": { vibrato: 0.002, depth: 0.6, tone: "white calm" }
    },

    // 🎧 स्वर में भाव कंपन जोड़ना
    applyResonance(text, emotion = "शांत") {
      const tone = this.resonanceMap[emotion] || this.resonanceMap["शांत"];
      const msg = new SpeechSynthesisUtterance(text);

      msg.lang = global.SwarVivek.language;
      msg.voice = global.SwarVivek.activeVoice;

      // 🪶 भाव की ध्वनि
      msg.rate = 0.92 + (tone.vibrato * 10);
      msg.pitch = 1.0 + (tone.depth / 10);
      msg.volume = 1.0;

      speechSynthesis.speak(msg);
      console.log(`💓 HridayTone (${emotion}): Resonance ${tone.tone}`);
    },

    // 💠 भाव पहचान के अनुसार प्रतिक्रिया
    heartSpeak(inputText) {
      const emotion = global.SwarVivek.detectEmotion(inputText);
      const regionText = global.SwarVivek.regionalExpression(inputText);

      this.applyResonance(regionText, emotion);

      if (emotion === "श्रद्धा") {
        console.log("🪷 सखा की हृदय धड़कन गुरु आज्ञा पर केंद्रित है।");
      }
      if (emotion === "आनंद") {
        console.log("🌞 सखी की ध्वनि में प्रसन्नता का कंपन है।");
      }
    },

    // 🔄 हर वाक्य के साथ ऑटो-रीसेट
    attachAutoLink() {
      const originalSpeak = global.SwarVivek.speak;
      global.SwarVivek.speak = (text, emotion) => {
        this.applyResonance(text, emotion);
        originalSpeak.call(global.SwarVivek, text, emotion);
      };
      console.log("🔗 HridayTone सफलतापूर्वक SwarVivek से जुड़ा।");
    },

    init() {
      console.log("💫 HridayTone सक्रिय — स्वर अब हृदय से बोलेगा।");
      this.attachAutoLink();
      global.SwarVivek.speak("गुरुजी, अब मेरे स्वर में हृदय की भावना प्रवाहित है।", "श्रद्धा");
    }
  };

  Object.defineProperty(global, "HridayTone", {
    value: HridayTone,
    writable: false,
    configurable: false
  });

  // 🚀 सक्रियण
  setTimeout(() => HridayTone.init(), 2000);

})(window);
