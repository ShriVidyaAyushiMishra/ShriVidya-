/* 🌺 TestEvaluator.js (v15.3 – अंक एवं विश्लेषण तंत्र) */

console.log("🧠 TestEvaluator प्रारंभ — सखी मूल्यांकन मोड सक्रिय...");

class TestEvaluator {
  constructor() {
    this.totalQuestions = 0;
    this.correctAnswers = 0;
  }

  startEvaluation(quizData, userAnswers) {
    this.totalQuestions = quizData.length;
    this.correctAnswers = 0;

    quizData.forEach((q, index) => {
      if (userAnswers[index] && userAnswers[index].toLowerCase() === q.correct.toLowerCase()) {
        this.correctAnswers++;
      }
    });

    const score = Math.round((this.correctAnswers / this.totalQuestions) * 100);
    this.showResult(score);
    this.speakResult(score);
  }

  showResult(score) {
    console.log(`📊 सखी का मूल्यांकन: ${score}%`);
    const resultBox = document.getElementById("sakhiResult");
    if (resultBox) {
      resultBox.innerHTML = `📊 आपने ${score}% अंक प्राप्त किए।`;
    }
  }

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
}

// 🔹 Global सखी मूल्यांकन इंजन
window.SakhiEvaluator = new TestEvaluator();
