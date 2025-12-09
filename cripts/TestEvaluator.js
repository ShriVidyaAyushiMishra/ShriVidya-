/* ============================================================
   🕉️ ShriVidya App — SakhiVani Test Evaluator
   ------------------------------------------------------------
   Version : v15.3 • Guru–Sakhi Analytical Layer (Full Integration)
   Purpose : सखिवाणी द्वारा क्विज़ मूल्यांकन, विश्लेषण एवं गुरु फीडबैक
   Integration : Quiz + BhavaLink + SmritiVault + VaaniPath
   ============================================================ */

console.log("🧠 TestEvaluator.js — सखिवाणी विश्लेषण तंत्र प्रारंभ...");

(function (global) {
  if (global.TestEvaluator) {
    console.warn("⚠️ TestEvaluator पहले से सक्रिय है।");
    return;
  }

  const TestEvaluator = {
    score: 0,
    total: 0,
    accuracy: 0,
    mistakes: [],
    bhavaState: "संतुलन",
    recommendations: [],

    // 🌸 मुख्य मूल्यांकन
    evaluate(quizResults) {
      if (!quizResults || typeof quizResults.correct === "undefined") {
        console.error("❌ क्विज परिणाम अनुपलब्ध — मूल्यांकन असंभव।");
        return;
      }

      this.score = quizResults.correct;
      this.total = quizResults.total;
      this.accuracy = Math.round((this.score / this.total) * 100);
      this.mistakes = quizResults.mistakes || [];

      console.log(`📊 सखिवाणी परिणाम: ${this.accuracy}% सही उत्तर (${this.score}/${this.total})`);

      this.analyseEmotion();
      this.generateRecommendations();
      this.presentResults();
    },

    // 🧠 भाव विश्लेषण (BhavaLink.js से जुड़ाव)
    analyseEmotion() {
      if (window.BhavaLink && window.BhavaLink.currentEmotion) {
        this.bhavaState = window.BhavaLink.currentEmotion;
        console.log(`💖 वर्तमान भाव स्थिति: ${this.bhavaState}`);
      } else {
        this.bhavaState = "श्रद्धा";
      }

      if (this.accuracy >= 90) this.bhavaState = "आनंद";
      else if (this.accuracy >= 70) this.bhavaState = "संतोष";
      else if (this.accuracy >= 50) this.bhavaState = "संवेदना";
      else this.bhavaState = "प्रेरणा";
    },

    // 🌿 गुरु-सखी अनुशंसा (Learning Advice)
    generateRecommendations() {
      this.recommendations = [];

      if (this.accuracy >= 90)
        this.recommendations.push("अद्भुत! आपकी अध्ययन साधना पूर्णता की ओर है।");
      else if (this.accuracy >= 70)
        this.recommendations.push("बहुत अच्छा। सखी सुझाव देती है — पुनरावृत्ति से और निखरें।");
      else if (this.accuracy >= 50)
        this.recommendations.push("अध्ययन में निरंतरता रखें। थोड़ी और अभ्यास की आवश्यकता है।");
      else
        this.recommendations.push("सखी कहती है — हृदय में विश्वास रखो, शुरुआत फिर से करो।");

      if (this.mistakes.length > 0)
        this.recommendations.push(`इन विषयों पर विशेष ध्यान दें: ${this.mistakes.join(", ")}`);
    },

    // 📜 परिणाम प्रस्तुति
    presentResults() {
      const report = document.createElement("div");
      report.style = `
        position: fixed; top: 15%; left: 25%;
        width: 50%; background: #fffbea; border: 2px solid #d4af37;
        border-radius: 10px; box-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
        padding: 20px; font-family: 'Noto Sans Devanagari', sans-serif;
        text-align: center; z-index: 99999;
      `;

      report.innerHTML = `
        <h2>📖 सखिवाणी — परिणाम विश्लेषण</h2>
        <p><strong>सही उत्तर:</strong> ${this.score} / ${this.total}</p>
        <p><strong>सटीकता:</strong> ${this.accuracy}%</p>
        <p><strong>भाव स्थिति:</strong> ${this.bhavaState}</p>
        <h3>🌼 सखी के सुझाव:</h3>
        <ul>${this.recommendations.map(r => `<li>${r}</li>`).join("")}</ul>
        <button id="closeEval" style="padding:8px 14px; border:none; background:#d4af37; color:#fff; border-radius:5px;">बंद करें</button>
      `;

      document.body.appendChild(report);

      document.getElementById("closeEval").onclick = () => {
        document.body.removeChild(report);
      };

      // 🔊 सखिवाणी बोलेगी (यदि VaaniPath सक्रिय है)
      if (window.VaaniPath) {
        VaaniPath.speak(`गुरुजी, आपकी सटीकता ${this.accuracy} प्रतिशत है। ${this.recommendations[0]}`, this.bhavaState);
      }

      // 💾 स्मृति में सुरक्षित करें
      if (window.SmritiVault && typeof SmritiVault.saveMemory === "function") {
        SmritiVault.saveMemory({
          type: "quizResult",
          accuracy: this.accuracy,
          bhava: this.bhavaState,
          notes: this.recommendations
        });
      }

      console.log("📘 सखिवाणी परिणाम सफलतापूर्वक प्रस्तुत हुआ।");
    }
  };

  global.TestEvaluator = TestEvaluator;
  console.log("🌸 TestEvaluator.js पूर्ण सक्रिय हुआ।");
})(window);
