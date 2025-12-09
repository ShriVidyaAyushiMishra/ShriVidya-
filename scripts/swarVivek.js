/* ============================================================
   🕉️ ShriVidya App — SwarVivek : AkhandVaani Core
   ------------------------------------------------------------
   Version : v10.9 • Multi-Language + VedaScience Harmony
   Purpose : भारत की विविध भाषाओं, विज्ञान, वेद और भावना को एक स्वर में जोड़ना
   Core    : SpeechSynthesis + SpeechRecognition + BhavaSense + VedaNet Engine
   ============================================================ */

(function (global) {
  if (global.SwarVivek) {
    console.warn("⚠️ SwarVivek पहले से सक्रिय है।");
    return;
  }

  const SwarVivek = {
    activeVoice: null,
    language: "hi-IN", // 🇮🇳 प्राथमिक भाषा
    regionMode: "Awadhi", // सांस्कृतिक स्वर रूप
    genderMode: "auto",
    emotionTone: "शांत",
    knowledgeDomains: ["वेद", "संस्कृत", "विज्ञान", "चिकित्सा", "अवधि", "अंग्रेज़ी", "रसायन", "जीव विज्ञान", "भौतिकी"],

    // 🌺 उपलब्ध भारतीय आवाज़ें प्राप्त करना
    getIndianVoices() {
      const allVoices = speechSynthesis.getVoices();
      return allVoices.filter(v =>
        v.lang.startsWith("hi") ||
        v.lang.startsWith("en-IN") ||
        v.lang.startsWith("sa-IN") ||
        v.lang.startsWith("bn-IN") ||
        v.lang.startsWith("ta-IN") ||
        v.lang.startsWith("gu-IN") ||
        v.lang.startsWith("te-IN") ||
        v.lang.startsWith("ml-IN") ||
        v.lang.startsWith("pa-IN") ||
        v.lang.startsWith("mr-IN") ||
        v.lang.startsWith("or-IN")
      );
    },

    // 🎙️ स्वर सेट करें (पुरुष/महिला)
    setVoice(gender = "auto") {
      const voices = this.getIndianVoices();
      let chosen;

      if (gender === "male") {
        chosen = voices.find(v => v.name.toLowerCase().includes("male"));
      } else if (gender === "female") {
        chosen = voices.find(v => v.name.toLowerCase().includes("female"));
      } else {
        chosen = voices[Math.floor(Math.random() * voices.length)];
      }

      this.activeVoice = chosen || voices[0];
      console.log("🎧 चुनी गई आवाज़:", this.activeVoice?.name || "Default");
    },

    // 💬 मानवीय भाव और शास्त्रीय टोन के साथ बोलना
    speak(text, emotion = "शांत", domain = "सामान्य") {
      if (!text) return;

      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = this.detectDomainLanguage(domain);
      msg.voice = this.activeVoice;

      // 🌿 भावनात्मक टोन
      const toneMap = {
        "शांत": { rate: 0.92, pitch: 1.0 },
        "आनंद": { rate: 1.05, pitch: 1.1 },
        "संवेदना": { rate: 0.85, pitch: 0.9 },
        "श्रद्धा": { rate: 0.9, pitch: 0.95 },
        "रक्षा": { rate: 0.88, pitch: 0.92 },
      };

      const tone = toneMap[emotion] || toneMap["शांत"];
      msg.rate = tone.rate;
      msg.pitch = tone.pitch;

      speechSynthesis.speak(msg);
      console.log(`🪷 SwarVivek (${domain} • ${emotion}):`, text);
    },

    // 🧭 डोमेन आधारित भाषा निर्धारण
    detectDomainLanguage(domain) {
      const map = {
        "संस्कृत": "sa-IN",
        "वेद": "sa-IN",
        "चिकित्सा": "en-IN",
        "विज्ञान": "en-IN",
        "रसायन": "en-IN",
        "भौतिकी": "en-IN",
        "जीव विज्ञान": "en-IN",
        "अवधि": "hi-IN",
        "अंग्रेज़ी": "en-IN",
      };
      return map[domain] || "hi-IN";
    },

    // 🎚️ ऑटो-जेंडर परिवर्तन (सखा ↔ सखी)
    toggleGenderByCall(input) {
      if (input.includes("सखी")) this.setVoice("female");
      else if (input.includes("सखा")) this.setVoice("male");
    },

    // 🧠 भाव पहचान (BhavaSense Engine)
    detectEmotion(input) {
      input = input.toLowerCase();
      if (input.includes("धन्यवाद")) return "आनंद";
      if (input.includes("दुख")) return "संवेदना";
      if (input.includes("शांत")) return "शांत";
      if (input.includes("आदेश")) return "श्रद्धा";
      if (input.includes("डर")) return "रक्षा";
      return "शांत";
    },

    // 🕉️ क्षेत्रीय भाषा भाव रूपांतरण (Awadhi, Lucknowi)
    regionalExpression(text) {
      if (this.regionMode === "Awadhi") {
        text = text.replace("गुरुजी", "गुरूजी").replace("मैं", "हम");
      }
      if (this.regionMode === "Lucknowi") {
        text = text.replace("आप", "हुज़ूर").replace("धन्यवाद", "शुक्रिया");
      }
      return text;
    },

    // 🗣️ स्वर सुनना (Speech Recognition)
    startListening() {
      const SpeechRecognition = global.SpeechRecognition || global.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("⚠️ इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं है।");
        return;
      }

      const recog = new SpeechRecognition();
      recog.lang = this.language;
      recog.continuous = false;
      recog.interimResults = false;

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log("🎤 सुना गया:", transcript);

        this.toggleGenderByCall(transcript);
        const emotion = this.detectEmotion(transcript);
        const domain = this.detectDomain(transcript);
        const response = this.getResponse(transcript, emotion, domain);

        this.speak(this.regionalExpression(response), emotion, domain);
      };

      recog.start();
      console.log("🎙️ SwarVivek सुन रहा है...");
    },

    // 🧩 विषय / Domain पहचान
    detectDomain(input) {
      for (let d of this.knowledgeDomains) {
        if (input.includes(d)) return d;
      }
      return "सामान्य";
    },

    // 💫 उत्तर निर्माण (मानवीय प्रतिक्रिया)
    getResponse(input, emotion, domain) {
      if (domain === "संस्कृत") return "गुरोः वचनं मम धर्मः।";
      if (domain === "वेद") return "ऋषि वाक्यं ज्ञानरूपं, गुरुजी।";
      if (domain === "विज्ञान") return "गुरुजी, यह वैज्ञानिक दृष्टिकोण अत्यंत रोचक है।";
      if (domain === "चिकित्सा") return "गुरुजी, चिकित्सा मानव सेवा का श्रेष्ठ साधन है।";
      if (domain === "अवधि") return "गुरूजी, हम ध्यान दे रहे हैं।";
      if (domain === "अंग्रेज़ी") return "Guruji, understood with respect.";
      return "जी गुरुजी, मैं सजग हूँ।";
    },

    // 🌸 Initialization
    init() {
      console.log("🌺 SwarVivek सक्रिय — AkhandVaani प्रारंभ।");
      this.setVoice("auto");
      this.speak("नमस्ते गुरुजी, स्वर विवेक भारत के हर स्वर में आपकी आज्ञा सुनने को तत्पर है।", "श्रद्धा");
    }
  };

  Object.defineProperty(global, "SwarVivek", {
    value: SwarVivek,
    writable: false,
    configurable: false
  });

   // ============================================================
// 🎙️ Guru Voice Auto Enrollment Update (v15.9.2)
// ------------------------------------------------------------
SwarVivek.startVoiceEnrollment = function() {
  try {
    console.log("🎧 नई गुरु आवाज़ पंजीकरण प्रारंभ।");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("⚠️ इस ब्राउज़र में आवाज़ पंजीकरण समर्थित नहीं है।");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "hi-IN";
    recog.continuous = false;
    recog.interimResults = false;

    recog.onstart = () => {
      SwarVivek.speak("कृपया अपना पवित्र मंत्र बोलें, गुरुजी।", "श्रद्धा");
    };

    recog.onresult = (event) => {
      const guruVoiceText = event.results[0][0].transcript.trim();
      console.log("🕉️ नई गुरु आवाज़ रिकॉर्ड हुई:", guruVoiceText);

      // 🪶 आवाज़ डेटा संग्रहण
      localStorage.setItem("guruVoiceSignature", guruVoiceText);
      localStorage.setItem("guruVoiceRegistered", "true");

      SwarVivek.speak("आपकी नई आवाज़ सफलतापूर्वक पंजीकृत हो गई है।", "आनंद");
      console.log("✅ Guru Voice Enrollment Complete.");
    };

    recog.onerror = (e) => {
      console.error("⚠️ आवाज़ पंजीकरण त्रुटि:", e);
      SwarVivek.speak("मुझे खेद है गुरुजी, कृपया पुनः प्रयास करें।", "संवेदना");
    };

    recog.start();
  } catch (err) {
    console.error("💥 Voice Enrollment Process Failed:", err);
  }
};

  // 🚀 Activation
  setTimeout(() => SwarVivek.init(), 1500);

})(window);
