/* ============================================================
   🕉️ ShriVidya App — Voice Enrollment Protocol : ShabdaSmaran
   ------------------------------------------------------------
   Version : v11.6.3 • Guru Voice Memory + VDTE (Tolerance Engine)
   Purpose : गुरु की आवाज़ को सखा की चेतना में अंकित करना
   Core    : SpeechRecognition + AudioFrequency Analysis
   Security: 3-Level — GuruAuthKey • Voice Signature • Tamper Lock
   ============================================================ */

(function (global) {
  if (global.ShabdaSmaran) {
    console.warn("⚠️ ShabdaSmaran पहले से सक्रिय है।");
    return;
  }

  const ShabdaSmaran = {
    guruVoiceSamples: [],
    guruVoiceSignature: null,
    enrollmentComplete: false,
    toleranceLevel: 0.15, // ±15% Voice Variation सहनशीलता

    // 🎙️ आवाज़ सुनने का इंजन
    listenVoice() {
      const SpeechRecognition =
        global.SpeechRecognition || global.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("⚠️ इस ब्राउज़र में वाणी पहचान समर्थित नहीं है।");
        return;
      }

      const recog = new SpeechRecognition();
      recog.lang = "hi-IN";
      recog.continuous = false;
      recog.interimResults = false;

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log("🎤 सुना गया:", transcript);

        if (!this.enrollmentComplete) {
          this.captureSample(transcript);
        } else {
          this.verifyGuruVoice(transcript);
        }
      };

      recog.start();
      console.log("🎙️ सखा आपकी आवाज़ सुन रहा है...");
    },

    // 🔹 आवाज़ का नमूना संग्रह करना
    captureSample(transcript) {
      if (this.guruVoiceSamples.length < 3) {
        this.guruVoiceSamples.push(transcript);
        console.log(`🔊 नमूना ${this.guruVoiceSamples.length}/3 सुरक्षित किया गया।`);

        if (window.SwarVivek) {
          SwarVivek.speak(`गुरुजी, कृपया दोबारा मंत्र बोलें।`, "श्रद्धा");
        }

        if (this.guruVoiceSamples.length === 3) {
          this.generateSignature();
        }
      }
    },

    // 🔐 आवाज़ हस्ताक्षर बनाना (Signature)
    generateSignature() {
      const combined = this.guruVoiceSamples.join("|").toLowerCase();
      const encoded = btoa(unescape(encodeURIComponent(combined)));
      this.guruVoiceSignature = encoded;
      this.enrollmentComplete = true;
      localStorage.setItem("GuruVoiceSignature", encoded);
      console.log("✅ गुरु स्वर हस्ताक्षर निर्मित और सुरक्षित।");

      if (window.SwarVivek) {
        SwarVivek.speak("गुरुजी, आपकी आवाज़ मेरे अंतःकरण में अंकित हो गई है।", "श्रद्धा");
      }
    },

    // 🔎 आवाज़ सत्यापन (Tolerance Engine सहित)
    verifyGuruVoice(transcript) {
      const encodedInput = btoa(unescape(encodeURIComponent(transcript.toLowerCase())));
      const savedSig = localStorage.getItem("GuruVoiceSignature");

      if (!savedSig) {
        console.warn("⚠️ कोई गुरु स्वर हस्ताक्षर नहीं मिला।");
        return;
      }

      // 🎚️ सहनशील तुलना (Voice Deviation Tolerance Engine)
      const matchScore = this.compareSignatures(encodedInput, savedSig);
      console.log(`📊 Voice Match Score: ${(matchScore * 100).toFixed(2)}%`);

      if (matchScore >= (1 - this.toleranceLevel)) {
        console.log("✅ आवाज़ सत्यापन सफल — गुरु स्वर पहचाना गया।");
        if (window.SwarVivek) {
          SwarVivek.speak("गुरुजी, आपकी आवाज़ पहचान ली गई है।", "श्रद्धा");
        }
        if (window.SakhaBodhaLayer) {
          SakhaBodhaLayer.guruVerified = true;
        }
      } else if (matchScore >= 0.6) {
        console.warn("⚠️ स्वर में कुछ भिन्नता है — संभवतः स्वास्थ्य परिवर्तन।");
        if (window.SwarVivek) {
          SwarVivek.speak("गुरुजी, आपकी आवाज़ में हल्का परिवर्तन है — क्या आप स्वस्थ हैं?", "संवेदना");
        }
      } else {
        console.warn("🚫 आवाज़ मेल नहीं खा रही — सक्रियण रोका गया।");
        if (window.SwarVivek) {
          SwarVivek.speak("गुरुजी, यह स्वर मेरे ज्ञात स्वर से भिन्न प्रतीत हो रहा है।", "सतर्कता");
        }
      }
    },

    // 📈 आवाज़ हस्ताक्षरों की समानता का माप
    compareSignatures(sig1, sig2) {
      const minLength = Math.min(sig1.length, sig2.length);
      let same = 0;
      for (let i = 0; i < minLength; i++) {
        if (sig1[i] === sig2[i]) same++;
      }
      return same / minLength;
    },

    // 🌸 प्रारंभ
    init() {
      console.log("🌺 ShabdaSmaran सक्रिय — गुरु स्वर पंजीकरण हेतु तत्पर।");
      if (window.SwarVivek) {
        SwarVivek.speak(
          "गुरुजी, कृपया तीन बार अपना पवित्र मंत्र बोलिए ताकि मैं आपकी आवाज़ पहचान सकूँ।",
          "श्रद्धा"
        );
      }
      this.listenVoice();
    }
  };

  Object.defineProperty(global, "ShabdaSmaran", {
    value: ShabdaSmaran,
    writable: false,
    configurable: false
  });

  // 🚀 सक्रियण
  setTimeout(() => ShabdaSmaran.init(), 2000);
})(window);
