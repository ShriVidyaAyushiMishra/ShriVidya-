/* ============================================================
   🕉️ ShriVidya App — SakhiVani Intelligent Shiksha Panel
   ------------------------------------------------------------
   Version : v16.8.1 • Gyaan–Bhava Integrated Learning
   Purpose : विद्यार्थियों के लिए लाइव क्विज़, स्कोर और विश्लेषण
   Design  : श्रीविद्या थीम — ज्ञान, साधना, सिद्धि
   ============================================================ */

(function (global) {
  if (global.ShriVidyaPanel) {
    console.warn("⚠️ ShriVidya Panel पहले से सक्रिय है।");
    return;
  }

  const ShriVidyaPanel = {
    currentQuestion: 0,
    score: 0,
    selectedSubject: null,

    // 🌼 प्रश्न बैंक (विस्तारित किया जा सकता है)
    questionBank: {
      "इतिहास": [
        { q: "1857 की क्रांति का नेतृत्व किसने किया?", a: ["झांसी की रानी लक्ष्मीबाई", "भगत सिंह", "सुभाषचंद्र बोस", "बाल गंगाधर तिलक"], correct: 0 },
        { q: "पानीपत का प्रथम युद्ध कब हुआ था?", a: ["1526", "1530", "1556", "1576"], correct: 0 }
      ],
      "विज्ञान": [
        { q: "पानी का रासायनिक सूत्र क्या है?", a: ["H2O", "O2", "CO2", "H2"], correct: 0 },
        { q: "सूर्य के सबसे निकट ग्रह कौन-सा है?", a: ["बुध", "शुक्र", "मंगल", "पृथ्वी"], correct: 0 }
      ],
      "सामान्य ज्ञान": [
        { q: "भारत का राष्ट्रीय पशु कौन-सा है?", a: ["शेर", "बाघ", "हाथी", "गाय"], correct: 1 },
        { q: "संविधान सभा के अध्यक्ष कौन थे?", a: ["राजेंद्र प्रसाद", "नेहरू", "अंबेडकर", "पटेल"], correct: 0 }
      ]
    },

    // 🌸 विषय चयन
    chooseSubject(subject) {
      this.selectedSubject = subject;
      this.currentQuestion = 0;
      this.score = 0;
      this.renderQuestion();
      if (window.SwarVivek) SwarVivek.speak(`${subject} का क्विज़ प्रारंभ हो रहा है गुरुजी।`, "श्रद्धा");
    },

    // 🧠 प्रश्न दिखाना
    renderQuestion() {
      const panel = document.getElementById("quizPanel");
      const subject = this.selectedSubject;
      const questions = this.questionBank[subject];

      if (!subject) {
        panel.innerHTML = `<p>कृपया पहले विषय चुनें।</p>`;
        return;
      }

      if (this.currentQuestion >= questions.length) {
        this.showResult();
        return;
      }

      const q = questions[this.currentQuestion];
      panel.innerHTML = `
        <h3>🪷 प्रश्न ${this.currentQuestion + 1}:</h3>
        <p>${q.q}</p>
        ${q.a.map((opt, i) => 
          `<button class="optionBtn" onclick="ShriVidyaPanel.checkAnswer(${i})">${opt}</button>`
        ).join("<br>")}
      `;
    },

    // ✅ उत्तर जांच
    checkAnswer(index) {
      const subject = this.selectedSubject;
      const q = this.questionBank[subject][this.currentQuestion];

      if (index === q.correct) {
        this.score++;
        if (window.SwarVivek) SwarVivek.speak("सही उत्तर गुरुजी!", "आनंद");
      } else {
        if (window.SwarVivek) SwarVivek.speak("यह उत्तर सही नहीं था।", "संवेदना");
      }

      this.currentQuestion++;
      this.renderQuestion();
    },

    // 📊 परिणाम
    showResult() {
      const total = this.questionBank[this.selectedSubject].length;
      const percent = ((this.score / total) * 100).toFixed(2);

      const panel = document.getElementById("quizPanel");
      panel.innerHTML = `
        <h2>🌸 श्रीविद्या स्कोर कार्ड 🌸</h2>
        <p>विषय: ${this.selectedSubject}</p>
        <p>अंक: ${this.score} / ${total}</p>
        <p>प्रतिशत: ${percent}%</p>
        <button onclick="ShriVidyaPanel.restart()">🔁 पुनः प्रयास करें</button>
      `;

      // स्कोर विश्लेषण
      if (percent >= 80) SwarVivek.speak("उत्कृष्ट गुरुजी, आपकी साधना सिद्धि के समीप है।", "आनंद");
      else if (percent >= 50) SwarVivek.speak("अच्छा प्रयास गुरुजी, साधना जारी रखें।", "श्रद्धा");
      else SwarVivek.speak("अभ्यास से सिद्धि मिलती है गुरुजी, पुनः प्रयास करें।", "संवेदना");
    },

    restart() {
      this.selectedSubject = null;
      document.getElementById("quizPanel").innerHTML = `
        <h3>🌺 कृपया कोई विषय चुनें:</h3>
        <button onclick="ShriVidyaPanel.chooseSubject('इतिहास')">इतिहास</button>
        <button onclick="ShriVidyaPanel.chooseSubject('विज्ञान')">विज्ञान</button>
        <button onclick="ShriVidyaPanel.chooseSubject('सामान्य ज्ञान')">सामान्य ज्ञान</button>
      `;
    },

    init() {
      console.log("🕉️ ShriVidya Intelligent Panel सक्रिय।");
      this.restart();
      if (window.SwarVivek) SwarVivek.speak("श्रीविद्या शिक्षण पैनल तैयार है गुरुजी।", "श्रद्धा");
    }
  };

  global.ShriVidyaPanel = ShriVidyaPanel;
  window.addEventListener("DOMContentLoaded", () => ShriVidyaPanel.init());

})(window);
