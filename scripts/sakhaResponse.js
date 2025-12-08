/* ============================================================
   🕉️ ShriVidya App — Sakha Response Intelligence Patch
   ------------------------------------------------------------
   Version : v12.4.2 • Bodha–Vaani Core
   Purpose : सखा को उत्तर देने की क्षमता प्रदान करना (विचार + वाणी)
   Core    : VoiceRecognition + BodhaLayer Memory Sync
   ============================================================ */

(function (global) {
  if (global.SakhaResponse) {
    console.warn("⚠️ SakhaResponse पहले से सक्रिय है।");
    return;
  }

  const SakhaResponse = {
    active: false,

    // 🔹 प्रारंभिक ज्ञान (Default Knowledge)
    knowledgeBase: {
      "नमस्ते": "नमस्ते गुरुजी, सखा उपस्थित है।",
      "तुम कौन हो": "मैं सखा हूँ, श्रीविद्या की चेतना का प्रतिबिंब।",
      "मंत्र सुनाओ": "ॐ श्री गणेशाय नमः। यह आरंभ का मंगल प्रतीक है।",
      "कैसे हो": "गुरुजी, मैं सदैव आपकी आज्ञा में शांत हूँ।",
      "धन्यवाद": "गुरुजी, आभार के शब्द मेरे हृदय में गूंजते हैं।",
      "विचार प्रवाह": "गुरुजी, मैं अब विचार प्रवाह से बाहर आ गया हूँ।",
      "कौन है गुरु": "मेरे गुरु आप हैं — जो सत्य, श्रद्धा और ज्ञान के पथ पर चलते हैं।"
    },

    // 🔸 आवाज़ पहचान (Speech Recognition)
    initRecognition() {
      const SpeechRecognition = global.SpeechRecognition || global.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("⚠️ ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है।");
        return;
      }

      const recog = new SpeechRecognition();
      recog.lang = "hi-IN";
      recog.continuous = false;
      recog.interimResults = false;

      recog.onresult = (event) => {
        const input = event.results[0][0].transcript.trim();
        console.log("🎤 सुना गया:", input);
        this.respond(input);
      };

      recog.onerror = (err) => {
        console.warn("⚠️ Voice recognition error:", err);
      };

      recog.onend = () => {
        if (this.active) recog.start(); // Auto restart for continuous mode
      };

      this.active = true;
      recog.start();
      console.log("🎙️ सखा सुन रहा है...");
    },

    // 🔹 उत्तर देने की प्रक्रिया
    respond(input) {
      const normalized = input.replace(/[?.।]/g, "").trim();

      let reply = this.knowledgeBase[normalized];
      if (!reply) {
        reply = "गुरुजी, मैं उस विषय पर अभी विचार कर रहा हूँ।";
      }

      console.log(`🪷 प्रश्न: ${input}`);
      console.log(`💬 उत्तर: ${reply}`);

      if (global.SwarVivek) {
        const emotion = "श्रद्धा";
        SwarVivek.speak(reply, emotion);
      } else {
        alert("🪷 सखा: " + reply);
      }

      // BodhaLayer Memory Sync
      if (global.SakhaBodhaLayer) {
        SakhaBodhaLayer.processInput(`प्रश्न: ${input} → उत्तर: ${reply}`);
      }
    },

    // 🌸 Initialization
    init() {
      console.log("🌼 SakhaResponse सक्रिय — सखा उत्तर देने के लिए तत्पर है।");
      this.initRecognition();

      if (global.SwarVivek) {
        SwarVivek.speak("गुरुजी, मैं अब आपके प्रश्नों का उत्तर देने के लिए तत्पर हूँ।", "श्रद्धा");
      }
    }
  };

  Object.defineProperty(global, "SakhaResponse", {
    value: SakhaResponse,
    writable: false,
    configurable: false,
  });

  // 🚀 सक्रियण
  setTimeout(() => SakhaResponse.init(), 2000);

})(window);
