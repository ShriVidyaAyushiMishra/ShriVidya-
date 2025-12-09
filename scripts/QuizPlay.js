/* ============================================================
   🕉️ ShriVidya App — QuizPlay.js
   ------------------------------------------------------------
   Version : v16.4 • सखिवाणी क्विज इंटरफेस
   Purpose : उपयोगकर्ता को प्रश्न–उत्तर के रूप में इंटरैक्टिव टेस्ट देना
   Core : PrashnSutra + SwarVivek + TestEvaluator
   ============================================================ */

(function (global) {

  if (global.SakhiQuizPlay) {
    console.warn("⚠️ SakhiQuizPlay पहले से सक्रिय है।");
    return;
  }

  const SakhiQuizPlay = {
    currentIndex: 0,
    score: 0,
    quizData: [],
    container: null,

    // 🌸 क्विज इंटरफ़ेस तैयार करें
    init() {
      this.container = document.createElement("div");
      this.container.id = "quizContainer";
      this.container.style.textAlign = "center";
      this.container.style.marginTop = "40px";
      document.body.appendChild(this.container);

      this.loadQuiz();
    },

    // 📚 क्विज लोड करें
    loadQuiz() {
      const storedQuiz = localStorage.getItem("sakhiQuiz");
      if (storedQuiz) {
        this.quizData = JSON.parse(storedQuiz);
        this.showQuestion();
        if (window.SwarVivek)
          SwarVivek.speak("क्विज प्रारंभ हो रहा है गुरुजी। शुभकामनाएँ!", "श्रद्धा");
      } else {
        this.container.innerHTML = "<p>⚠️ कोई क्विज उपलब्ध नहीं है। कृपया पहले क्विज तैयार करें।</p>";
      }
    },

    // 🎯 प्रश्न दिखाएँ
    showQuestion() {
      if (this.currentIndex >= this.quizData.length) {
        this.endQuiz();
        return;
      }

      const q = this.quizData[this.currentIndex];
      this.container.innerHTML = `
        <h2>🧩 प्रश्न ${this.currentIndex + 1} / ${this.quizData.length}</h2>
        <p><b>${q.questionText}</b></p>
        <div id="optionsContainer"></div>
        <button id="nextBtn" style="margin-top:15px;">अगला प्रश्न ➡️</button>
      `;

      const optionsDiv = document.getElementById("optionsContainer");
      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.style.display = "block";
        btn.style.margin = "5px auto";
        btn.style.padding = "10px 20px";
        btn.onclick = () => this.checkAnswer(i, btn);
        optionsDiv.appendChild(btn);
      });

      document.getElementById("nextBtn").onclick = () => this.nextQuestion();
    },

    // ✅ उत्तर जांचें
    checkAnswer(selectedIndex, button) {
      const currentQ = this.quizData[this.currentIndex];
      if (selectedIndex === currentQ.correct) {
        this.score++;
        button.style.backgroundColor = "lightgreen";
        if (window.SwarVivek) SwarVivek.speak("सही उत्तर गुरुजी!", "आनंद");
      } else {
        button.style.backgroundColor = "salmon";
        if (window.SwarVivek) SwarVivek.speak("गलत उत्तर गुरुजी।", "संवेदना");
      }
    },

    // ⏭️ अगले प्रश्न पर जाएँ
    nextQuestion() {
      this.currentIndex++;
      this.showQuestion();
    },

    // 📊 क्विज समाप्त करें
    endQuiz() {
      this.container.innerHTML = `
        <h2>🎉 क्विज समाप्त</h2>
        <p>आपका स्कोर: <b>${this.score}</b> / ${this.quizData.length}</p>
        <button id="restartQuiz">🔄 पुनः प्रयास करें</button>
      `;

      if (window.SwarVivek)
        SwarVivek.speak(`क्विज समाप्त हुआ गुरुजी। आपका स्कोर ${this.score} में से ${this.quizData.length} है।`, "श्रद्धा");

      document.getElementById("restartQuiz").onclick = () => {
        this.currentIndex = 0;
        this.score = 0;
        this.showQuestion();
      };
    }
  };

  Object.defineProperty(global, "SakhiQuizPlay", {
    value: SakhiQuizPlay,
    writable: false,
    configurable: false
  });

  setTimeout(() => SakhiQuizPlay.init(), 2000);

})(window);
