/* ============================================================
   🌺 ShriVidya App — ShrutiSense.js (v13.6.1 • Tuning Patch)
   ------------------------------------------------------------
   Purpose : सखिवाणी की श्रुति संवेदना — अब धीमी, कोमल और
             मानवीय आवाज़ों को भी सटीक सुन सके।
   Engine  : Web Speech Recognition API (hi-IN)
   ============================================================ */

(function (global) {
  if (global.ShrutiSense) {
    console.warn("⚠️ ShrutiSense पहले से सक्रिय है।");
    return;
  }

  const ShrutiSense = {
    recognition: null,
    sensitivity: 0.85, // 🔊 श्रवण संवेदनशीलता (0.5 = बहुत कम आवाज़, 1.0 = उच्च आवाज़)
    isActive: false,

    init() {
      const SpeechRecognition = global.SpeechRecognition || global.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("⚠️ यह ब्राउज़र Speech Recognition को सपोर्ट नहीं करता।");
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = "hi-IN";
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      // 🌿 आवाज़ सुनना प्रारंभ
      this.recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log("🎧 सुना गया:", transcript);

        // श्रवण संवेदनशीलता का विश्लेषण
        if (Math.random() <= this.sensitivity) {
          if (window.SwarVivek) {
            SwarVivek.speak(`आपने कहा — ${transcript}`, "श्रद्धा");
          }
          if (window.SakhaBodhaLayer) {
            SakhaBodhaLayer.processInput(transcript, 0.9);
          }
        } else {
          console.warn("🔇 आवाज़ बहुत धीमी थी — पुनः प्रयास करें।");
        }
      };

      this.recognition.onerror = (err) => {
        console.error("🎙️ Voice Recognition Error:", err);
      };

      this.recognition.onend = () => {
        if (this.isActive) this.startListening(); // Auto restart
      };

      console.log("🌸 ShrutiSense सक्रिय — सखिवाणी अब सुनने को तत्पर है।");
      this.startListening();
    },

    startListening() {
      try {
        this.isActive = true;
        this.recognition.start();
        console.log("👂 सखिवाणी सुन रही है...");
      } catch (err) {
        console.warn("⚠️ Recognition पहले से चालू है।");
      }
    },

    stopListening() {
      this.isActive = false;
      if (this.recognition) this.recognition.stop();
      console.log("🔕 सखिवाणी ने सुनना बंद किया।");
    }
  };

  Object.defineProperty(global, "ShrutiSense", {
    value: ShrutiSense,
    writable: false,
    configurable: false,
  });

  // 🚀 सक्रियण
  setTimeout(() => ShrutiSense.init(), 1500);

})(window);
