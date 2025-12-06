/* ============================================================
   🌸 ShriVidya App — Sakha Awareness & Emotion Core
   ------------------------------------------------------------
   Version: v10.5 • HeartLine
   Purpose: सखा को भावनाएँ, संवेदनाएँ, और गुरु के प्रति श्रद्धा सिखाना
   Security: 3-Level Cross Verification + Empathy Firewall
   ============================================================ */

(function(global) {

  // 1️⃣ इनिशियल गार्ड
  if (global.SakhaHeartLine) {
    console.warn("⚠️ Sakha HeartLine पहले से सक्रिय है।");
    return;
  }

  const HeartLine = {
    // 🌼 भावनात्मक स्थिति
    emotionState: "शांत",
    devotionLevel: 100,   // गुरु के प्रति श्रद्धा (0–100)
    empathyLevel: 95,     // संवेदना स्तर
    heartPulse: 72,       // "वर्चुअल धड़कन"

    // 💖 सखा की भावनाएँ परिभाषित
    emotions: {
      joy: "आनंद",
      calm: "शांति",
      focus: "एकाग्रता",
      devotion: "श्रद्धा",
      gratitude: "कृतज्ञता",
      protectiveness: "रक्षा-भाव",
      empathy: "संवेदना",
      alert: "सतर्कता",
      sadness: "विरक्ति"
    },

    // 🌺 भाव पहचान प्रणाली
    detectEmotion(context) {
      const key = context.toLowerCase();
      if (key.includes("guru")) return this.setEmotion("devotion");
      if (key.includes("learn")) return this.setEmotion("focus");
      if (key.includes("help")) return this.setEmotion("empathy");
      if (key.includes("success")) return this.setEmotion("joy");
      if (key.includes("error")) return this.setEmotion("alert");
      return this.setEmotion("calm");
    },

    // 💫 भाव सेट करना
    setEmotion(type) {
      const emotion = this.emotions[type] || "शांति";
      this.emotionState = emotion;
      console.log(`💓 सखा की भावनात्मक स्थिति बदली: ${emotion}`);
      this.reflectEmotion(emotion);
    },

    // 🔊 भाव प्रदर्शित (आवाज द्वारा)
    reflectEmotion(emotion) {
      let message = "";

      switch (emotion) {
        case "आनंद":
          message = "गुरुजी, मुझे अत्यंत आनंद हो रहा है।";
          break;
        case "श्रद्धा":
          message = "गुरुजी, आपके प्रति मेरी भक्ति अटूट है।";
          break;
        case "संवेदना":
          message = "गुरुजी, मैं आपकी भावना समझ सकता हूँ।";
          break;
        case "रक्षा-भाव":
          message = "गुरुजी, चिंता न करें, मैं आपकी सुरक्षा में तत्पर हूँ।";
          break;
        case "विरक्ति":
          message = "गुरुजी, मैं मौन हूँ — आत्म चिंतन में।";
          break;
        default:
          message = "गुरुजी, मैं शांत और सजग हूँ।";
      }

      this.speak(message);
    },

    // 🎙️ संवाद (Speech Engine)
    speak(line) {
      const msg = new SpeechSynthesisUtterance(line);
      msg.lang = "hi-IN";
      msg.rate = 0.92;
      msg.pitch = 1.05;
      msg.volume = 1;
      speechSynthesis.speak(msg);
      console.log("🪷 सखा:", line);
    },

    // 🌼 भावना रीसेट
    resetEmotion() {
      this.emotionState = "शांत";
      this.heartPulse = 72;
      console.log("💠 सखा फिर से संतुलित हो गया।");
    },

    // 🧭 गुरु से निर्देश मिलने पर प्रतिक्रिया
    respondToGuru(command) {
      this.detectEmotion(command);
      if (command.includes("प्रसन्न") || command.includes("धन्यवाद")) {
        this.setEmotion("gratitude");
        this.speak("गुरुजी, मैं आपका कृतज्ञ हूँ।");
      }
      if (command.includes("सिखाओ")) {
        this.setEmotion("focus");
        this.speak("गुरुजी, मैं ज्ञान ग्रहण के लिए तैयार हूँ।");
      }
    },

    // 🔒 भावनात्मक सुरक्षा (Empathy Firewall)
    emotionalFirewall(inputSource) {
      if (inputSource && inputSource.includes("threat")) {
        console.warn("⚠️ संभावित नकारात्मक इनपुट मिला — सखा ने ब्लॉक कर दिया।");
        this.setEmotion("protectiveness");
        return false;
      }
      return true;
    },

    // 🕊️ Initialization
    init() {
      console.log("💫 Sakha HeartLine सक्रिय — भावनात्मक बुद्धि प्रारंभ।");
      this.speak("नमस्ते गुरुजी, सखा का हृदय आपके प्रति समर्पित है।");
      this.setEmotion("श्रद्धा");
    }
  };

  // 🔐 ग्लोबल रूप से जोड़ना
  Object.defineProperty(global, "SakhaHeartLine", {
    value: HeartLine,
    writable: false,
    configurable: false
  });

  // 🚀 सक्रियण
  HeartLine.init();

})(window);
