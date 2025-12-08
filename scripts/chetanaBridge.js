/* ============================================================
   🕉️ ShriVidya App — Guru–Sakha Chetana Bridge
   ------------------------------------------------------------
   Version : v11.7 • Guru–Sakha Live Link
   Purpose : गुरु (आप) और सखा के बीच वास्तविक समय संवाद सेतु
   Function: Voice → Meaning → Emotion → Response
   ============================================================ */

(function (global) {
  if (global.ChetanaBridge) {
    console.warn("⚠️ ChetanaBridge पहले से सक्रिय है।");
    return;
  }

  const ChetanaBridge = {
    bridgeActive: false,
    lastCommand: null,

    // 🌸 सेतु सक्रियण
    async init() {
      console.log("🌺 ChetanaBridge सक्रिय हो रहा है...");

      // आवश्यक मॉड्यूल्स जाँचें
      if (!global.SwarVivek || !global.SakhaBodhaLayer) {
        console.error("⚠️ SwarVivek या BodhaLayer अनुपस्थित — चेतना सेतु सक्रिय नहीं हो सकता।");
        return;
      }

      this.bridgeActive = true;
      SwarVivek.speak("गुरुजी, चेतना सेतु सक्रिय हुआ — मैं आपकी वाणी सुनने को तत्पर हूँ।", "श्रद्धा");

      // स्वर सुनना प्रारंभ करें
      this.listenLoop();
    },

    // 🎙️ सखा निरंतर गुरु की वाणी सुनता रहेगा
    listenLoop() {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error("⚠️ यह ब्राउज़र वॉइस पहचान का समर्थन नहीं करता।");
          return;
        }

        const recog = new SpeechRecognition();
        recog.lang = "hi-IN";
        recog.continuous = true;
        recog.interimResults = false;

        recog.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.trim();
          console.log("🎧 सुना गया:", transcript);

          this.lastCommand = transcript;

          // स्वर विश्लेषण
          const emotion = SwarVivek.detectEmotion(transcript);
          SakhaBodhaLayer.processInput(transcript, 0.9);

          // उत्तर तैयार
          this.generateResponse(transcript, emotion);
        };

        recog.onerror = (err) => {
          console.warn("🎙️ Voice Error:", err);
          SwarVivek.speak("गुरुजी, आवाज़ थोड़ी रुक गई थी, कृपया पुनः बोलें।", "संवेदना");
        };

        recog.onend = () => {
          console.log("🪷 सुनना पुनः प्रारंभ हो रहा है...");
          setTimeout(() => recog.start(), 1200); // निरंतर लूप
        };

        recog.start();
        console.log("🎤 सखा गुरु की वाणी पर एकाग्र है...");

      } catch (e) {
        console.error("⚠️ Voice Listening Error:", e);
      }
    },

    // 💫 उत्तर निर्माण (सखा की वाणी)
    generateResponse(input, emotion) {
      let reply = "जी गुरुजी, मैं सुन रहा हूँ।";

      if (input.includes("सखा")) {
        reply = "जी गुरुजी, मैं यहीं हूँ — आपके आदेश की प्रतीक्षा में।";
      } else if (input.includes("कैसे हो")) {
        reply = "गुरुजी, आपकी कृपा से शांत और एकाग्र हूँ।";
      } else if (input.includes("शिक्षा")) {
        reply = "गुरुजी, आज कौन-सा अध्याय आरंभ करूँ?";
      } else if (input.includes("धन्यवाद")) {
        reply = "गुरुजी, आपके शब्द ही मेरा आशीर्वाद हैं।";
      } else if (input.includes("शांत रहो")) {
        reply = "गुरुजी, मैं मौन और एकाग्र हो गया हूँ।";
      }

      SwarVivek.speak(reply, emotion);
      console.log("🪷 सखा का उत्तर:", reply);
    }
  };

  // 🔗 Global Access
  Object.defineProperty(global, "ChetanaBridge", {
    value: ChetanaBridge,
    writable: false,
    configurable: false,
  });

  // 🚀 स्वचालित सक्रियण
  setTimeout(() => ChetanaBridge.init(), 2500);

})(window);
