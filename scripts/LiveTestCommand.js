// 🧭 LiveTestCommand.js (v15.9.8 — SakhiVani Quiz Panel)
// 🌺 ShriVidya सखिवाणी — Interactive Quiz Mode (Guru–Sakhi Talk)

(function (global) {
  console.log("🪷 LiveTestCommand.js सक्रिय किया जा रहा है...");

  const LiveTestCommand = {
    subjects: ["इतिहास", "विज्ञान", "भूगोल", "राजनीति", "सामान्य ज्ञान"],
    currentQuestionIndex: 0,
    questions: [],
    score: 0,

    // 🌸 प्रारंभिक सेटअप
    init() {
      this.createInterface();
      console.log("🌼 सखिवाणी क्विज़ पैनल तैयार है।");
    },

    // 🧩 UI निर्माण
    createInterface() {
      const container = document.createElement("div");
      container.id = "sakhiQuizPanel";
      container.style.position = "fixed";
      container.style.bottom = "10%";
      container.style.left = "50%";
      container.style.transform = "translateX(-50%)";
      container.style.padding = "20px";
      container.style.border = "2px solid #e6a7ff";
      container.style.borderRadius = "15px";
      container.style.background = "rgba(255,255,255,0.95)";
      container.style.textAlign = "center";
      container.style.zIndex = "9999";
      container.style.width = "320px";
      container.style.fontFamily = "'Noto Sans Devanagari', sans-serif";

      container.innerHTML = `
        <h3>🌸 सखिवाणी लाइव क्विज़ 🌸</h3>
        <label>📚 विषय चुनें:</label>
        <select id="quizSubjectSelect">
          ${this.subjects.map(s => `<option value="${s}">${s}</option>`).join("")}
        </select>
        <br/><br/>
        <button id="startQuizBtn">🧠 प्रारंभ करें</button>
        <div id="quizArea" style="display:none; margin-top:15px;"></div>
      `;

      document.body.appendChild(container);

      document.getElementById("startQuizBtn").addEventListener("click", () => {
        const subject = document.getElementById("quizSubjectSelect").value;
        this.startQuiz(subject);
      });
    },

    // 🌿 क्विज़ प्रारंभ
    async startQuiz(subject) {
      console.log(`🎯 "${subject}" विषय का क्विज़ प्रारंभ हो रहा है...`);
      const area = document.getElementById("quizArea");
      area.style.display = "block";
      area.innerHTML = `<p>📘 "${subject}" विषय से प्रश्न एकत्रित किए जा रहे हैं...</p>`;

      // यदि GyaanPulse मौजूद है तो उससे प्रश्न लें
      if (global.GyaanPulse && typeof global.GyaanPulse.fetchQuestions === "function") {
        this.questions = await global.GyaanPulse.fetchQuestions(subject, 5);
      } else {
        // fallback (डमी प्रश्न)
        this.questions = [
          { q: "भारत का संविधान कब लागू हुआ?", options: ["1947", "1949", "1950", "1952"], a: 2 },
          { q: "ताजमहल कहाँ स्थित है?", options: ["दिल्ली", "आगरा", "जयपुर", "लखनऊ"], a: 1 },
          { q: "पृथ्वी का उपग्रह कौन है?", options: ["सूर्य", "चंद्रमा", "मंगल", "शुक्र"], a: 1 },
          { q: "गुरुत्वाकर्षण का सिद्धांत किसने दिया?", options: ["आइंस्टीन", "न्यूटन", "गैलीलियो", "रामानुजन"], a: 1 },
          { q: "राष्ट्रीय पशु कौन-सा है?", options: ["हाथी", "शेर", "बाघ", "गाय"], a: 2 }
        ];
      }

      this.score = 0;
      this.currentQuestionIndex = 0;
      this.showQuestion();
    },

    // 🧠 प्रश्न दिखाना
    showQuestion() {
      const area = document.getElementById("quizArea");
      const q = this.questions[this.currentQuestionIndex];

      area.innerHTML = `
        <h4>प्रश्न ${this.currentQuestionIndex + 1} / ${this.questions.length}</h4>
        <p>${q.q}</p>
        ${q.options.map((opt, i) => 
          `<button class="optBtn" data-index="${i}">${opt}</button>`
        ).join("<br/>")}
      `;

      document.querySelectorAll(".optBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const selected = parseInt(e.target.dataset.index);
          if (selected === q.a) this.score++;
          this.nextQuestion();
        });
      });
    },

    // ➡️ अगला प्रश्न
    nextQuestion() {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.showQuestion();
      } else {
        this.showResult();
      }
    },

    // 🏁 परिणाम
    showResult() {
      const area = document.getElementById("quizArea");
      const percent = Math.round((this.score / this.questions.length) * 100);
      area.innerHTML = `
        <h3>🎉 क्विज़ समाप्त 🎉</h3>
        <p>आपका स्कोर: ${this.score} / ${this.questions.length}</p>
        <h4>प्रतिशत: ${percent}%</h4>
        <p>${percent >= 75 ? "🌸 बहुत बढ़िया प्रदर्शन!" : "💪 अभ्यास जारी रखें!"}</p>
      `;

      if (window.SwarVivek) {
        SwarVivek.speak(`गुरुजी, आपका स्कोर ${percent} प्रतिशत आया है।`);
      }
    }
  };

  global.LiveTestCommand = LiveTestCommand;
  setTimeout(() => LiveTestCommand.init(), 1000);
})(window);
