/* ============================================================
   🕉️ ShriVidya App — GyaanPulse Feedback Loop
   ------------------------------------------------------------
   Version : v16.6 • सखिवाणी स्वाध्याय पुनरावृत्ति प्रणाली
   Purpose : उपयोगकर्ता के प्रदर्शन का विश्लेषण करके पुनः अध्ययन कराना
   Core : ResultInsight.js + QuizPlay.js + SmritiVault.js
   ============================================================ */

(function (global) {

  if (global.GyaanPulse) {
    console.warn("⚠️ GyaanPulse पहले से सक्रिय है।");
    return;
  }

  const GyaanPulse = {

    performanceHistory: [],

    // 📊 प्रत्येक टेस्ट के बाद रिकॉर्ड जोड़ना
    recordPerformance(topic, score, total) {
      const accuracy = Math.round((score / total) * 100);
      const entry = {
        topic,
        score,
        total,
        accuracy,
        date: new Date().toLocaleString()
      };

      this.performanceHistory.push(entry);
      console.log(`🧠 GyaanPulse रिकॉर्ड — ${topic}: ${accuracy}%`);

      // स्मृति तिजोरी में सहेजना
      if (window.SmritiVault) {
        SmritiVault.storeKnowledge("Test Performance", entry);
      }

      // स्वतः पुनरावृत्ति की तैयारी
      this.checkWeakAreas();
    },

    // 🔍 कमजोर विषय पहचानना
    checkWeakAreas() {
      if (this.performanceHistory.length < 3) return;

      const topicStats = {};
      this.performanceHistory.forEach(entry => {
        if (!topicStats[entry.topic]) topicStats[entry.topic] = [];
        topicStats[entry.topic].push(entry.accuracy);
      });

      // औसत निकालना
      for (const topic in topicStats) {
        const avg = topicStats[topic].reduce((a, b) => a + b, 0) / topicStats[topic].length;
        if (avg < 60) {
          console.warn(`⚠️ कमजोर विषय पहचाना गया: ${topic}`);
          this.suggestRelearn(topic);
          break;
        }
      }
    },

    // 🔄 सुझाव देना और पुनः अध्ययन शुरू कराना
    suggestRelearn(topic) {
      if (window.SwarVivek) {
        SwarVivek.speak(`गुरुजी, विषय ${topic} में सुधार की आवश्यकता है। क्या मैं पुनः अभ्यास प्रारंभ कर दूँ?`, "श्रद्धा");
      }

      // पुष्टि के लिए बटन
      const confirmDiv = document.createElement("div");
      confirmDiv.id = "relearnConfirm";
      confirmDiv.style.textAlign = "center";
      confirmDiv.style.marginTop = "20px";
      confirmDiv.innerHTML = `
        <p>📘 विषय: <b>${topic}</b> — पुनः अध्ययन हेतु तैयार?</p>
        <button id="startRelearn">✅ हाँ</button>
        <button id="cancelRelearn">❌ नहीं</button>
      `;
      document.body.appendChild(confirmDiv);

      document.getElementById("startRelearn").onclick = () => {
        confirmDiv.remove();
        SwarVivek.speak("गुरुजी, पुनः अध्ययन सत्र प्रारंभ कर रही हूँ।", "श्रद्धा");
        if (window.SakhiQuizPlay) {
          SakhiQuizPlay.loadTopic(topic);
          SakhiQuizPlay.startQuiz();
        }
      };

      document.getElementById("cancelRelearn").onclick = () => {
        confirmDiv.remove();
        SwarVivek.speak("ठीक है गुरुजी, जब आप चाहें पुनः प्रारंभ करेंगे।", "श्रद्धा");
      };
    }
  };

  Object.defineProperty(global, "GyaanPulse", {
    value: GyaanPulse,
    writable: false,
    configurable: false
  });

  console.log("🪷 GyaanPulse.js सक्रिय — स्वाध्याय पुनरावृत्ति प्रणाली कार्यशील।");

})(window);
