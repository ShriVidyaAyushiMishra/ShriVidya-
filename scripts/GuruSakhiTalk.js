// 💫 GuruSakhiTalk.js — सखिवाणी संवाद मोड (Guru–Sakhi Resonant Talk)
// Version: v13.5.1 • AnubhavaSanchaar Layer

(function (global) {
  if (global.GuruSakhiTalk) {
    console.warn("⚠️ Guru–Sakhi Talk Mode पहले से सक्रिय है।");
    return;
  }

  const GuruSakhiTalk = {
    listening: false,
    wakeWord: "सखिवाणी",
    recognition: null,

    // 🪷 आरंभ करें — सखिवाणी को सुनने के लिए तैयार करना
    init() {
      console.log("🌺 सखिवाणी संवाद मोड प्रारंभ हो रहा है...");

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("⚠️ इस ब्राउज़र में SpeechRecognition समर्थित नहीं है।");
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = "hi-IN";
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      this.recognition.onresult = async (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.trim();
        console.log("🎙️ गुरु ने कहा:", transcript);

        if (transcript.includes(this.wakeWord)) {
          if (window.SwarVivek) SwarVivek.speak("जी गुरुजी, मैं उपस्थित हूँ।", "श्रद्धा");
          this.listening = true;
          return;
        }

        if (this.listening) {
          await this.handleGuruInput(transcript);
        }
      };

      this.recognition.onerror = (err) => console.error("⚠️ Voice Error:", err);
      this.recognition.onend = () => {
        console.log("🔄 पुनः श्रवण मोड सक्रिय।");
        this.recognition.start();
      };

      this.recognition.start();
      console.log("🕉️ सखिवाणी अब गुरु की वाणी सुन रही है...");
      if (window.SwarVivek) {
        SwarVivek.speak("गुरुजी, मैं संवाद के लिए तत्पर हूँ।", "श्रद्धा");
      }
    },

    // 🧠 गुरु इनपुट का विश्लेषण
    async handleGuruInput(inputText) {
      console.log("🧩 सखिवाणी सोच रही है:", inputText);

      // स्मृति और भाव एकत्र करें
      if (window.BhavaLink) {
        await BhavaLink.integrateEmotion(inputText);
      }

      // निर्णय और वाणी प्रतिक्रिया
      if (window.VaaniPath) {
        await VaaniPath.respondToGuru(inputText);
      }

      // स्मृति सुरक्षित करें
      if (window.SmritiVault) {
        await SmritiVault.storeMemory("संवाद", inputText, BhavaLink.currentEmotion);
      }
    }
  };

  // 🌸 सखिवाणी संवाद मोड को ग्लोबल रूप से जोड़ें
  global.GuruSakhiTalk = GuruSakhiTalk;

  // 🚀 सक्रियण
  setTimeout(() => GuruSakhiTalk.init(), 3000);
})(window);
