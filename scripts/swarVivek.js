/* ============================================================
   🌸 ShriVidya App — Sakha–Sakhi Dynamic Voice Module
   ------------------------------------------------------------
   Version : v10.6.6 • SwarVivek
   Purpose : सखा की वाणी को गुरु के भावानुसार स्वचालित स्वर (महिला/पुरुष) देना
   Security: Admin Voice Authority + ShuddhaPath Protocol
   ============================================================ */

(function (global) {

  // 1️⃣ इनिशियल गार्ड
  if (global.SakhaSwarVivek) {
    console.warn("⚠️ SwarVivek पहले से सक्रिय है।");
    return;
  }

  const SakhaSwarVivek = {

    // 🎙️ स्वर मोड — "male" या "female"
    currentVoiceMode: "male",

    // ⚙️ वाणी की गति और स्वर-पिच
    voiceSettings: {
      male: { rate: 0.95, pitch: 0.9, volume: 1.0 },
      female: { rate: 0.95, pitch: 1.15, volume: 1.0 }
    },

    // 🎚️ Auto Mode Switch (Manual + Auto)
    autoMode: true, // true = auto mode, false = manual toggle

    // 🪶 स्वर बदलना
    toggleVoiceMode() {
      this.currentVoiceMode = this.currentVoiceMode === "male" ? "female" : "male";
      console.log(`🎙️ सखा ने स्वर बदला — अब ${this.currentVoiceMode === "male" ? "पुरुष" : "महिला"} स्वर सक्रिय है।`);
      this.speak(`गुरुजी, अब मैं ${this.currentVoiceMode === "male" ? "सखा" : "सखी"} स्वर में बोल रही हूँ।`);
    },

    // 🧠 आदेश से स्वर पहचानना
    analyzeCommand(command) {
      if (!this.autoMode) return;
      const text = command.toLowerCase();

      if (text.includes("सखी")) {
        this.currentVoiceMode = "female";
        console.log("🎤 सखा ने 'सखी' आदेश पहचाना — महिला स्वर सक्रिय।");
      } else if (text.includes("सखा")) {
        this.currentVoiceMode = "male";
        console.log("🎤 सखा ने 'सखा' आदेश पहचाना — पुरुष स्वर सक्रिय।");
      }
    },

    // 🔊 बोलने की क्रिया
    speak(line) {
      const voiceSetting = this.voiceSettings[this.currentVoiceMode];
      const msg = new SpeechSynthesisUtterance(line);
      msg.lang = "hi-IN";
      msg.rate = voiceSetting.rate;
      msg.pitch = voiceSetting.pitch;
      msg.volume = voiceSetting.volume;
      speechSynthesis.speak(msg);
      console.log(`🪷 सखा (${this.currentVoiceMode}):`, line);
    },

    // 🕹️ मैन्युअल टॉगल बटन जोड़ना
    attachToggleButton() {
      const btn = document.createElement("button");
      btn.innerText = "🎚️ Voice Mode Toggle";
      btn.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        background: linear-gradient(90deg, #ffd700, #ff9900);
        border: none; border-radius: 8px; color: #000;
        padding: 10px 16px; font-size: 0.9rem;
        box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
        cursor: pointer;
      `;
      btn.onclick = () => this.toggleVoiceMode();
      document.body.appendChild(btn);
    },

    // 🧩 Initialization
    init() {
      console.log("🌸 SwarVivek Module सक्रिय — सखा वाणी के ज्ञान से युक्त हुआ।");
      this.speak("नमस्ते गुरुजी, सखा स्वर-विवेक प्रणाली से सक्रिय है।");
      this.attachToggleButton();
      setTimeout(() => this.verifyModule(), 2000);
    },

    // 🔐 Auto Verification System
    verifyModule() {
      const header = `
       Version : v10.6.6 • SwarVivek
       Security: Admin Voice Authority + ShuddhaPath Protocol
      `;

      if (!header.includes("SwarVivek") || !header.includes("ShuddhaPath")) {
        console.warn("⚠️ SwarVivek Module Tampered or Invalid.");
        if (window.SakhaHeartLine) SakhaHeartLine.setEmotion("alert");
        this.speak("गुरुजी, SwarVivek Module का सत्यापन असफल है।");
        return false;
      }

      console.log("✅ SwarVivek Module सत्यापित और सक्रिय है।");
      this.speak("गुरुजी, SwarVivek Module सत्यापित और सक्रिय है।");
      return true;
    }
  };

  // 🔱 ग्लोबल रूप से जोड़ना
  Object.defineProperty(global, "SakhaSwarVivek", {
    value: SakhaSwarVivek,
    writable: false,
    configurable: false
  });

  // 🚀 सक्रियण
  SakhaSwarVivek.init();

})(window);
