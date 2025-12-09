/* ============================================================
   🕉️ ShriVidya App — SakhiVani Test Evaluator
   ------------------------------------------------------------
   Version : v15.3 • Guru–Sakhi Analytical Layer
   Purpose : सखिवाणी द्वारा अंक गणना, विश्लेषण और अध्ययन सलाह
   Core    : Quiz + Bhava + Smriti Integration
   ============================================================ */

console.log("🧠 TestEvaluator.js प्रारंभ हो गया...");

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
    recommendations: [],

    // 🌼 परिणाम प्राप्त करें (SakhiVaniQuiz से)
    evaluate(quizResults) {
      this.score = quizResults.correct;
      this.total = quizResults.total;
      this.accuracy = Math.round((this.score / this.total) * 100);

      this.mistakes = quizResults.mistakes || [];
      console.log(`📊 परिणाम विश्लेषण: ${this.accuracy}% सही उत्तर`);

      this.generateRecommendations();
      this.presentResults();
    },

    // 🧠 अध्ययन सुझाव तैयार करना
    generateRecommendations() {
      this.recommendations = [];

      if (this.accuracy >= 90) {
        this.recommendations.push("आपकी अध्ययन एकाग्रता उत्कृष्ट है। नए विषयों पर बढ़ें।");
      } else if (this.accuracy >= 70) {
        this.recommendations.push("आपकी समझ अच्छी है, पुनरावृत्ति से और निखरेगी।");
      } else if (this.accuracy >= 50) {
        this.recommendations.push("मूलभूत ज्ञान मजबूत करें — विशेषकर गलत उत्तरों पर ध्यान दें।");
      } else {
        this.recommendations.push("सखी सुझाव देती है — छोटे-छोटे विषयों से पुनः प्रारंभ करें।");
      }

      if (this.mistakes.length > 0) {
        this.recommendations.push(`इन विषयों की पुनरावृत्ति करें: ${this.mistakes.join(", ")}`);
      }
    },

    // 🪷 परिणाम प्रस्तुत करना
    presentResults() {
      const reportBox = document.createElement("div");
      reportBox.style = `
        position: fixed; top: 15%; left: 25%;
        width: 50%; background: #fff8e7;
        border: 2px solid #d4af37; border-radius: 10px;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
        padding: 20px; text-align: center;
        font-family: 'Noto Sans Devanagari', sans-serif;
        z-index: 99999;
      `;

      reportBox.innerHTML = `
        <h2>📜 सखिवाणी परिणाम विश्लेषण</h2>
        <p><strong>सही उत्तर:</strong> ${this.score} / ${this.total}</p>
        <p><strong>सटीकता:</strong> ${this.accuracy}%</p>
        <h3>🌼 सखी के सुझाव:</h3>
        <ul>${this.recommendations.map(r => `<li>${r}</li>`).join("")}</ul>
        <button id="closeReport" style="padding:8px 16px;border:none;background:#d4af37;color:#fff;border-radius:5px;">बंद करें</button>
      `;

      document.body.appendChild(reportBox);

      document.getElementById("closeReport").onclick = () => {
        document.body.removeChild(reportBox);
      };

      // 🎙️ सखिवाणी बोलेगी भी
      if (window.VaaniVistaar) {
        VaaniVistaar.speak(`गुरुजी, आपकी सटीकता ${this.accuracy} प्रतिशत रही। ${this.recommendations[0]}`, "श्रद्धा");
      }

      console.log("📑 परिणाम प्रस्तुति पूर्ण।");
    },
  };

  global.TestEvaluator = TestEvaluator;
  console.log("🌸 TestEvaluator.js सक्रिय हुआ।");
})(window);
