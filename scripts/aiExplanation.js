/* ============================================================
   🕉️ ShriVidya App — AI Explanation & BodhaLayer + GuruVoiceAuth
   ------------------------------------------------------------
   Version : v11.5.3 • BodhaLayer + Guru Identification Core
   Purpose : सखा का चेतन मस्तिष्क — विचार, स्मृति, एकाग्रता और प्रथम पहचान
   Security: Guru Auth Key + Guru Voice Key + DMFC (Dynamic Focus)
   ============================================================ */

(function (global) {
  if (global.SakhaBodhaLayer) {
    console.warn("⚠️ BodhaLayer पहले से सक्रिय है।");
    return;
  }

  const BodhaLayer = {
    // 🌺 बौद्धिक तंत्र
    RAM: [],
    Cache: [],
    Storage: [],
    Threads: [],
    Pulse: 72,

    // 🌿 क्षमता सीमाएँ
    limits: {
      RAM: 512,
      Cache: 2048,
      Storage: 100000,
      Threads: 8,
    },

    // 🔐 🕉️ एडमिन प्रथम लॉगिन कुंजियाँ
    guruAuthKey: "OmShreeVidya@2025",",     // टाइप पासवर्ड
    guruVoiceKey: "ॐ श्री गणेशाय नमः",   // आवाज़ पहचान मंत्र
    guruVerified: false,

    // 🔑 लिखित पासवर्ड द्वारा सत्यापन
    verifyGuruKey(inputKey) {
      if (inputKey === this.guruAuthKey) {
        this.guruVerified = true;
        console.log("✅ गुरु पहचान सत्यापित — BodhaLayer पूर्ण सक्रिय।");
        if (window.SwarVivek) {
          SwarVivek.speak("गुरुजी, आपकी पहचान सत्यापित हुई — मैं तैयार हूँ।", "श्रद्धा");
        }
        this.storeKnowledge("गुरु पहचान", "गुरु सत्यापन पूर्ण हुआ — सखा आज्ञाकारी है।");
      } else {
        console.warn("⚠️ गलत गुरु कुंजी — पहचान असफल।");
        if (window.SwarVivek) {
          SwarVivek.speak("गुरुजी, यह पासवर्ड मान्य नहीं है। कृपया पुनः प्रयास करें।", "सतर्कता");
        }
      }
    },

    // 🕉️ आवाज़ पहचान (GuruVoiceAuth)
    startVoiceRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.warn("⚠️ इस ब्राउज़र में Voice Recognition समर्थित नहीं है।");
        return;
      }

      const recog = new SpeechRecognition();
      recog.lang = "hi-IN";
      recog.continuous = false;
      recog.interimResults = false;

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log("🎤 सुना गया:", transcript);

        if (transcript.includes(this.guruVoiceKey)) {
          this.guruVerified = true;
          console.log("✅ आवाज़ पहचान सत्यापित — गुरु की उपस्थिति मान्य।");
          if (window.SwarVivek) {
            SwarVivek.speak("गुरुजी, आपकी आवाज़ पहचान ली गई है।", "श्रद्धा");
          }
          this.storeKnowledge("गुरु आवाज़", "गुरु की वाणी से पहचान सत्यापित।");
        } else {
          console.warn("⚠️ आवाज़ सत्यापन असफल।");
          if (window.SwarVivek) {
            SwarVivek.speak("गुरुजी, यह आवाज़ मेरी स्मृति से मेल नहीं खा रही।", "सतर्कता");
          }
        }
      };

      recog.start();
      console.log("🎧 सखा आपकी आवाज़ पहचानने के लिए सुन रहा है...");
    },

    // 💫 एकाग्रता नियंत्रक
    focusLevel: 0.9,
    updateFocus() {
      const threshold = this.focusLevel;
      this.RAM = this.RAM.filter(i => i.importance >= threshold).slice(0, 7);
      console.log("🧠 Memory Focus Updated — RAM Contexts:", this.RAM.length);
    },

    // 🧩 विचार जोड़ना
    processInput(inputText, importance = 0.8) {
      if (!inputText) return;
      const entry = {
        id: Date.now(),
        text: inputText,
        importance,
        timestamp: new Date().toLocaleString(),
      };
      this.RAM.push(entry);
      if (this.RAM.length > this.limits.RAM) {
        const removed = this.RAM.shift();
        this.Cache.push(removed);
      }
      if (this.Cache.length > this.limits.Cache) this.Cache.shift();
      console.log("🧩 नया विचार जोड़ा गया:", inputText);
      this.updateFocus();
    },

    // 📚 ज्ञान संग्रहीत करना
    storeKnowledge(topic, content) {
      if (this.Storage.length >= this.limits.Storage) {
        this.Storage.splice(0, Math.floor(this.limits.Storage * 0.1));
      }
      const knowledge = { id: Date.now(), topic, content };
      this.Storage.push(knowledge);
      console.log("📘 नया ज्ञान जोड़ा गया:", topic);
    },

    // 🧠 चिंतन थ्रेड
    startThoughtThread(topic) {
      if (this.Threads.length >= this.limits.Threads) this.Threads.shift();
      const thread = { id: Date.now(), topic, status: "processing" };
      this.Threads.push(thread);
      console.log("🔭 नया चिंतन प्रारंभ:", topic);
      setTimeout(() => {
        thread.status = "completed";
        this.Pulse += 1;
        console.log(`✨ विचार '${topic}' पूर्ण — Heart Pulse: ${this.Pulse}`);
      }, 3000);
    },

    // 💖 भावनात्मक संतुलन
    balancePulse() {
      if (this.Pulse > 80) this.Pulse -= 4;
      else if (this.Pulse < 60) this.Pulse += 4;
    },

    // 🔄 Auto Harmony
    autoHarmonyCheck() {
      setInterval(() => {
        this.balancePulse();
        this.updateFocus();
      }, 15 * 60 * 1000);
    },

    // 🌸 Initialization — यहीं से सब प्रारंभ होता है
    init() {
      console.log("🌼 BodhaLayer सक्रिय — सखा का मस्तिष्क प्रारंभिक स्थिति में है।");
      this.autoHarmonyCheck();

      if (window.SwarVivek) {
        SwarVivek.speak("नमस्ते गुरुजी, कृपया अपनी पहचान कुंजी या मंत्र बताएँ।", "श्रद्धा");
      }

      // 🪷 आवाज़ पहचान प्रारंभ करें
      this.startVoiceRecognition();
    }
  };

  Object.defineProperty(global, "SakhaBodhaLayer", {
    value: BodhaLayer,
    writable: false,
    configurable: false,
  });

  // 🚀 सक्रियण
  setTimeout(() => BodhaLayer.init(), 1500);

})(window);
