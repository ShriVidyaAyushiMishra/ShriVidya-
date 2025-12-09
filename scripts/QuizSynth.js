// 🎓 QuizSynth.js — प्रश्न निर्माण प्रणाली (v15.1)
// सखी के द्वारा स्वचालित क्विज तैयार करने की प्रणाली

console.log("🎯 QuizSynth सक्रिय है — प्रश्नों को क्विज रूप में संयोजित कर रही है।");

const QuizSynth = {
  quizData: [],
  quizHTML: "",

  // 🔹 स्मृति तिजोरी से प्रश्न प्राप्त करें
  loadFromSmriti() {
    const stored = localStorage.getItem("Sakhi_QuizData");
    if (stored) {
      this.quizData = JSON.parse(stored);
      console.log(`📘 ${this.quizData.length} प्रश्न लोड किए गए।`);
    } else {
      alert("⚠️ कोई प्रश्न स्मृति में नहीं मिले। कृपया पहले 'ज्ञान नाड़ी प्रणाली' चलाएँ।");
    }
  },

  // 🔹 प्रश्नों को HTML रूप में तैयार करें
  renderQuiz() {
    if (this.quizData.length === 0) {
      this.loadFromSmriti();
    }

    let container = document.createElement("div");
    container.classList.add("sakhi-quiz-container");

    this.quizData.forEach((q, index) => {
      let questionBlock = document.createElement("div");
      questionBlock.classList.add("question-block");
      questionBlock.innerHTML = `
        <h3>🪶 प्रश्न ${index + 1}: ${q.question}</h3>
        ${q.options
          .map(
            (opt) => `
          <label>
            <input type="radio" name="q${index}" value="${opt}">
            ${opt}
          </label><br>
        `
          )
          .join("")}
      `;
      container.appendChild(questionBlock);
    });

    let submitBtn = document.createElement("button");
    submitBtn.textContent = "📤 उत्तर जमा करें";
    submitBtn.classList.add("quiz-submit-btn");
    submitBtn.onclick = () => this.evaluateQuiz();

    container.appendChild(submitBtn);
    document.body.innerHTML = "";
    document.body.appendChild(container);

    console.log("✅ क्विज तैयार है — सखी प्रतीक्षा में है।");
  },

  // 🔹 उपयोगकर्ता के उत्तर जाँचें
  evaluateQuiz() {
    let score = 0;

    this.quizData.forEach((q, index) => {
      let selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });

    let percentage = ((score / this.quizData.length) * 100).toFixed(2);
    alert(`✨ आपका स्कोर: ${score}/${this.quizData.length} (${percentage}%)`);

    console.log(`📊 स्कोर: ${score}/${this.quizData.length} (${percentage}%)`);
  }
};

window.QuizSynth = QuizSynth;
