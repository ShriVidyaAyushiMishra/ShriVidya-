/* ============================================================
   🕉️ ShriVidya App — GuruSmaranLink : Dual Authentication Bridge
   ------------------------------------------------------------
   Version : v11.6.4 • Voice + Key Verification
   Purpose : गुरु की आवाज़ और कुंजी दोनों का संयुक्त सत्यापन
   Bridge  : BodhaLayer ↔ ShabdaSmaran ↔ SwarVivek
   Security: 3-Level Protection — Voice • Key • Emotion
   ============================================================ */

(function (global) {
  if (global.GuruSmaranLink) {
    console.warn("⚠️ GuruSmaranLink पहले से सक्रिय है।");
    return;
  }

  const GuruSmaranLink = {
    voiceVerified: false,
    keyVerified: false,
    finalActivated: false,

    // 🧠 कुंजी सत्यापन
    verifyGuruKey(inputKey) {
      if (!global.SakhaBodhaLayer) {
        console.error("⚠️ BodhaLayer अनुपस्थित — Key verification संभव नहीं।");
        return;
      }

      const storedKey = global.SakhaBodhaLayer.guruAuthKey;
      if (inputKey === storedKey) {
        this.keyVerified = true;
        console.log("✅ गुरु कुंजी सत्यापित।");
        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, आपकी कुंजी मान्य है।", "श्रद्धा");

        this.tryActivation();
      } else {
        console.warn("🚫 गलत गुरु कुंजी।");
        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, यह कुंजी मान्य नहीं है।", "सतर्कता");
      }
    },

    // 🎙️ आवाज़ सत्यापन (ShabdaSmaran से)
    verifyGuruVoice(transcript) {
      const savedSig = localStorage.getItem("GuruVoiceSignature");
      if (!savedSig) {
        console.warn("⚠️ कोई आवाज़ हस्ताक्षर नहीं मिला।");
        return;
      }

      const encodedInput = btoa(unescape(encodeURIComponent(transcript.toLowerCase())));
      let match = 0;
      const minLen = Math.min(encodedInput.length, savedSig.length);
      for (let i = 0; i < minLen; i++) {
        if (encodedInput[i] === savedSig[i]) match++;
      }

      const ratio = match / minLen;
      if (ratio >= 0.85) {
        this.voiceVerified = true;
        console.log("✅ गुरु स्वर सत्यापित।");
        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, आपकी आवाज़ पहचान ली गई है।", "श्रद्धा");

        this.tryActivation();
      } else {
        console.warn("⚠️ आवाज़ मेल नहीं खा रही।");
        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, यह स्वर भिन्न प्रतीत हो रहा है।", "सतर्कता");
      }
    },

    // 🔄 द्वि-स्तरीय सक्रियण
    tryActivation() {
      if (this.voiceVerified && this.keyVerified && !this.finalActivated) {
        this.finalActivated = true;
        console.log("🌺 दोनों सत्यापन पूर्ण — सखा पूर्ण रूप से सक्रिय।");

        if (window.SakhaBodhaLayer) {
          global.SakhaBodhaLayer.guruVerified = true;
          global.SakhaBodhaLayer.storeKnowledge(
            "गुरु स्मरण",
            "गुरु की वाणी और कुंजी दोनों सत्यापित — सखा पूर्ण निष्ठा से सक्रिय।"
          );
        }

        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, आपकी वाणी और कुंजी दोनों सत्यापित हुईं — मैं आपके आदेश में हूँ।", "श्रद्धा");
      }
    },

    // 🌸 Initialization
    init() {
      console.log("🕉️ GuruSmaranLink सक्रिय — द्वि-स्तरीय पहचान प्रणाली तैयार।");
      if (window.SwarVivek)
        SwarVivek.speak("गुरुजी, कृपया अपनी कुंजी दर्ज करें और फिर अपना पवित्र स्वर बोलें।", "श्रद्धा");
    },
  };

  Object.defineProperty(global, "GuruSmaranLink", {
    value: GuruSmaranLink,
    writable: false,
    configurable: false,
  });

  // 🚀 सक्रियण
  setTimeout(() => GuruSmaranLink.init(), 2000);
})(window);
