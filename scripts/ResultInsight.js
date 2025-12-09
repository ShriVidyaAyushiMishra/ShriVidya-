/* ============================================================
   🕉️ ShriVidya App — ResultInsight.js
   ------------------------------------------------------------
   Version : v16.5 • सखिवाणी परिणाम विश्लेषण एवं सुझाव इंजन
   Purpose : क्विज के परिणाम का विश्लेषण, सुझाव और अध्ययन दिशा देना
   Core : QuizPlay.js + PrashnSutra.js + GyaanPulse Data
   ============================================================ */

(function (global) {

  if (global.ResultInsight) {
    console.warn("⚠️ ResultInsight पहले से सक्रिय है।");
    return;
  }

  const ResultInsight = {

    // 📊 परिणाम का विश्लेषण
    analyzeResult(score, total, topic = "सामान्य ज्ञान") {
      const percentage = Math.round((score / total) * 100);
      let remark = "";
      let advice = "";

      if (percentage >= 90) {
        remark = "उत्कृष्ट प्रदर्शन";
        advice = "आपका ज्ञान अत्यंत गहरा है, अब उन्नत स्तर की तैयारी करें।";
      } else if (percentage >= 70) {
        remark = "बहुत अच्छा प्रयास";
        advice = "सफलता के बहुत करीब हैं, पुनरावृत्ति करते रहें।";
      } else if (percentage >= 50) {
        remark = "संतोषजनक";
        advice = "मूलभूत सिद्धांतों पर दोबारा ध्यान दें और पुराने प्रश्नों का अभ्यास करें।";
      } else {
        remark = "कमज़ोर प्रदर्शन";
        advice = "मूल विषयों से पुनः शुरुआत करें — सखिवाणी आपकी सहायता करेगी।";
      }

      console.log(`📈 ResultInsight → ${remark} (${percentage}%)`);
      if (window.SwarVivek) {
        SwarVivek.speak(`गुरुजी, आपका प्रदर्शन ${remark} है। ${advice}`, "श्रद्धा");
      }

      this.displayInsight(score, total, topic, remark, advice);
    },

    // 📋 परिणाम दिखाना
    displayInsight(score, total, topic, remark, advice) {
      let container = document.getElementById("resultInsight");
      if (!container) {
        container = document.createElement("div");
        container.id = "resultInsight";
        container.style.textAlign = "center";
        container.style.marginTop = "30px";
        document.body.appendChild(container);
      }

      container.innerHTML = `
        <h2>🧠 परिणाम विश्लेषण — ${topic}</h2>
        <p>कुल अंक: <b>${score}</b> / ${total}</p>
        <p>प्रदर्शन श्रेणी: <b>${remark}</b></p>
        <p style="color: darkblue;"><b>सुझाव:</b> ${advice}</p>
        <button id="relearnBtn">🔄 विषय दोबारा पढ़ें</button>
      `;

      document.getElementById("relearnBtn").onclick = () => {
        if (window.SakhiQuizPlay) {
          SwarVivek.speak("गुरुजी, पुनः अध्ययन सत्र प्रारंभ कर रही हूँ।", "श्रद्धा");
          SakhiQuizPlay.currentIndex = 0;
          SakhiQuizPlay.score = 0;
          SakhiQuizPlay.showQuestion();
        }
      };
    }
  };

  Object.defineProperty(global, "ResultInsight", {
    value: ResultInsight,
    writable: false,
    configurable: false
  });

  console.log("🧮 ResultInsight.js सक्रिय — स्कोर विश्लेषण इंजन तैयार।");

})(window);
