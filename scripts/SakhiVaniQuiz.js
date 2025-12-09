/* ============================================================
   🕉️ ShriVidya App — SakhiVani Quiz Intelligence
   ------------------------------------------------------------
   Version : v16.2 • Guru–Sakhi Study System
   Purpose : सखिवाणी द्वारा स्वतः विषय चयन और प्रश्न रचना
   Engine  : BhavaLink + ShrutiSense + SmritiVault Integration
   ============================================================ */

console.log("📚 SakhiVani Quiz Intelligence प्रारंभ हो रही है...");

(function (global) {
  if (global.SakhiVaniQuiz) {
    console.warn("⚠️ SakhiVani Quiz पहले से सक्रिय है।");
    return;
  }

  const SakhiVaniQuiz = {
    isActive: false,
    currentTopic: null,
    questions: [],
    score: 0,

    // 🌼 विषय पहचान
    detectTopic(input) {
      const topics = ["इतिहास", "विज्ञान", "नीति शास्त्र", "गणित", "संस्कृत"];
      for (let t of topics) {
        if (input.includes(t)) return t;
      }
      return "सामान्य ज्ञान";
    },

    // 🧠 प्रश्न रचना (Basic Dynamic)
    generateQuestions(topic) {
      const quizData = {
        इतिहास: [
          { q: "अशोक का राज्य किस वंश से था?", a: "मौर्य वंश" },
          { q: "दिल्ली सल्तनत की स्थापना कब हुई?", a: "1206 ई." },
        ],
        विज्ञान: [
          { q: "पानी का रासायनिक सूत्र क्या है?", a: "H₂O" },
          { q: "मनुष्य के शरीर में कितनी हड्डियाँ होती हैं?", a: "206" },
        ],
        गणित: [
          { q: "पाई का मान लगभग कितना है?", a: "3.1416" },
          { q: "तीन कोणों का योग कितने अंश का होता है?", a: "180°" },
        ],
        संस्कृत: [
          { q: "‘गच्छति’ धातु किस लकार में है?", a: "लट् लकार" },
          { q: "‘विद्या’ शब्द का लिंग क्या है?", a: "स्त्रीलिंग" },
        ],
        "नीति शास्त्र": [
          { q: "‘सत्यमेव जयते’ किस ग्रंथ से लिया गया है?", a: "मुण्डकोपनिषद्" },
          { q: "‘अहिंसा परम धर्मः’ का अर्थ क्या है?", a: "अहिंसा सबसे बड़ा धर्म है" },
        ],
        "सामान्य ज्ञान": [
          { q: "भारत के पहले राष्ट्रपति कौन थे?", a: "डॉ. राजेन्द्र प्रसाद" },
          { q: "राष्ट्रीय पशु कौन-सा है?", a: "बाघ" },
        ],
      };

      return quizData[topic] || quizData["सामान्य ज्ञान"];
    },

    // 🪷 क्विज प्रारंभ
    startQuiz(inputText) {
      this.currentTopic = this.detectTopic(inputText);
      this.questions = this.generateQuestions(this.currentTopic);
      this.score = 0;
      this.isActive = true;

      console.log(`🎯 विषय चयनित: ${this.currentTopic}`);
      VaaniVistaar.speak(`गुरुजी, आज का विषय है ${this.currentTopic}. पहला प्रश्न प्रस्तुत है।`, "आनंद");

      this.askQuestion();
    },

    // 🧾 प्रश्न पूछना
    askQuestion() {
      if (!this.questions.length) {
        this.finishQuiz();
        return;
      }

      const current = this.questions.shift();
      this.currentQuestion = current;

      VaaniVistaar.speak(current.q, "श्रद्धा");

      const answerBox = document.createElement("input");
      answerBox.type = "text";
      answerBox.placeholder = "उत्तर यहाँ लिखें...";
      answerBox.style = `
        position: fixed; bottom: 15px; left: 15px;
        width: 85%; padding: 10px; font-size: 16px;
        border-radius: 8px; border: 1px solid #ccc; z-index: 9999;
      `;
      document.body.appendChild(answerBox);

      answerBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const ans = e.target.value.trim();
          e.target.value = "";
          this.checkAnswer(ans);
        }
      });
    },

    // ✅ उत्तर जांच
    checkAnswer(userAns) {
      const correct = this.currentQuestion.a;
      if (userAns === correct) {
        this.score++;
        VaaniVistaar.speak("बहुत सुन्दर गुरुजी! उत्तर सही है।", "आनंद");
      } else {
        VaaniVistaar.speak(`सही उत्तर है — ${correct}`, "संवेदना");
      }
      setTimeout(() => this.askQuestion(), 2000);
    },

    // 📊 परिणाम
    finishQuiz() {
      this.isActive = false;
      VaaniVistaar.speak(
        `क्विज समाप्त हुई गुरुजी। आपका अंक ${this.score} है।`,
        "श्रद्धा"
      );
      console.log(`🏆 गुरुजी का परिणाम: ${this.score}`);
    },
  };

  global.SakhiVaniQuiz = SakhiVaniQuiz;

  console.log("🌼 SakhiVani Quiz Intelligence सक्रिय।");
})(window);
