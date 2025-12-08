/* ============================================================
   🌼 ShriVidya App — ShrutiSense + BhavaLink Sync
   ------------------------------------------------------------
   Version : v13.6.2 • Shruti–Bhava Resonance
   Purpose : सखिवाणी की श्रुति अब भाव–अनुभूति से जुड़ी।
   System  : Speech Recognition + Emotion Mapping (via BhavaLink)
   ============================================================ */

(function (global) {
  if (global.ShrutiSense) {
    console.warn("⚠️ ShrutiSense पहले से सक्रिय है।");
    return;
  }

  const ShrutiSense = {
    recognition: null,
    sensitivity: 0.85,
    isActive: false,

    // 🌺 भाव पहचान तालिका
    emotionMap: {
      "खुश": "आनंद",
      "खुशी": "आनंद",
      "धन्यवाद": "कृतज्ञता",
      "शांत": "शांत",
      "डर": "रक्षा",
      "भय": "रक्षा",
      "दुख": "संवेदना",
      "प्रेम": "श्रद्धा",
      "आशीर्वाद": "श्रद्धा"
    },

    init() {
      const SpeechRecognition = global.SpeechRecognition || global.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("⚠️ Speech Recognition समर्थित नहीं है।");
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = "hi-IN";
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      // 🌿 आवाज़ सुनने का परिणाम
      this.recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log("🎧 सुना गया:", transcript);

        if (Math.random() <= this.sensitivity) {
          const detectedEmotion = this.detectEmotion(transcript);
          console.log("💫 पहचानी गई भावना:", detectedEmotion);

          // 💞 BhavaLink से समन्वय
          if (global.BhavaLink) {
            BhavaLink.updateEmotion(detectedEmotion);
          }

          // 🧠 सखा की स्मृति में जोड़ना
          if (global.SakhaBodhaLayer) {
            SakhaBodhaLayer.processInput(transcript, 0.9);
          }

          // 🪷 प्रतिक्रिया देना
          if (global.SwarVivek) {
            SwarVivek.speak(`गुरुजी, मैंने ${detectedEmotion} भाव महसूस किया।`, detectedEmotion);
          }
        } else {
          console.warn("🔇 आवाज़ बहुत धीमी थी — पुनः प्रयास करें।");
        }
      };

      this.recognition.onerror = (err) => console.error("🎙️ त्रुटि:", err);
      this.recognition.onend = () => {
        if (this.isActive) this.startListening();
      };

      console.log("🌼 ShrutiSense सक्रिय — अब भावानुभूति सहित सुनने में सक्षम।");
      this.startListening();
    },

    // 🧠 भावना पहचान फ़ंक्शन
    detectEmotion(text) {
      text = text.toLowerCase();
      for (let key in this.emotionMap) {
        if (text.includes(key)) return this.emotionMap[key];
      }
      return "शांत"; // डिफ़ॉल्ट भाव
    },

    // 👂 सुनना प्रारंभ
    startListening() {
      try {
        this.isActive = true;
        this.recognition.start();
        console.log("👂 सखिवाणी सुन रही है...");
      } catch {
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

  setTimeout(() => ShrutiSense.init(), 1500);

})(window);
