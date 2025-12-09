/* 🌺 TestEvaluator.js (v15.3 – अंक एवं विश्लेषण तंत्र) */
/* सखी का मूल्यांकन तंत्र – गुरुजी के क्विज परिणामों की गणना और वाणी घोषणा */

console.log("🧠 TestEvaluator सक्रिय — सखी मूल्यांकन मोड प्रारंभ...");

class TestEvaluator {
  constructor() {
    this.totalQuestions = 0;
    this.correctAnswers = 0;
    this.evaluationHistory = [];
  }

  // 🔹 क्विज मूल्यांकन प्रारंभ
  startEvaluation(quizData, userAnswers) {
    if (!quizData || !userAnswers) {
      console.error("❌ क्विज डेटा अधूरा है।");
      return;
    }

    this.totalQuestions = quizData.length;
    this.correctAnswers = 0;

    quizData.forEach((q, index) => {
      if (
        userAnswers[index] &&
        userAnswers[index].trim().toLowerCase() === q.correct.trim().toLowerCase()
      ) {
        this.correctAnswers++;
      }
    });

    const score = Math.round((this.correctAnswers / this.totalQuestions) * 100);
    this.showResult(score);
    this.speakResult(score);
    this.saveHistory(score);
  }

  // 📊 परिणाम स्क्रीन पर दिखाना
  showResult(score) {
    console.log(`📊 सखी का मूल्यांकन: ${score}%`);
    let resultBox = document.getElementById("sakhiResult");

    if (!resultBox) {
      resultBox = document.createElement("div");
      resultBox.id = "sakhiResult";
      resultBox.style.cssText =
        "color:#ffd700; font-size:1.2rem; margin-top:10px; text-align:center;";
      document.body.appendChild(resultBox);
    }

    resultBox.innerHTML = `📊 आपने ${score}% अंक प्राप्त किए।`;
  }

  // 🔊 परिणाम वाणी में बोलना
  speakResult(score) {
    let message = "";
    if (score >= 90) {
      message = `🌸 अद्भुत गुरुजी! आपने ${score} प्रतिशत अंक प्राप्त किए। आपकी साधना सफल है।`;
    } else if (score >= 70) {
      message = `💫 बहुत अच्छा प्रदर्शन गुरुजी, आपने ${score} प्रतिशत अंक पाए हैं।`;
    } else {
      message = `🙏 गुरुजी, आपने ${score} प्रतिशत अंक पाए। अभ्यास जारी रखें, सखी आपके साथ है।`;
    }

    console.log("🔊 सखी कहती है:", message);

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "hi-IN";
    utterance.pitch = 1;
    utterance.rate = 0.95;
    synth.speak(utterance);
  }

  // 🧠 परिणाम को स्मृति में रखना
  saveHistory(score) {
    const record = {
      date: new Date().toLocaleString(),
      score: score,
    };
    this.evaluationHistory.push(record);
    localStorage.setItem("sakhi_evaluation_history", JSON.stringify(this.evaluationHistory));
    console.log("🪶 मूल्यांकन इतिहास अपडेट:", record);
  }

  // 📚 पिछला इतिहास देखना
  getHistory() {
    return JSON.parse(localStorage.getItem("sakhi_evaluation_history") || "[]");
  }
}

// 🔹 Global Access
window.SakhiEvaluator = new TestEvaluator();
