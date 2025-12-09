/* ============================================================
   🕉️ ShriVidya App — ComparativeCore.js
   ------------------------------------------------------------
   Version : v16.0 • Pattern & Trend Intelligence
   Purpose : सखिवाणी की “विचार शक्ति” — प्रश्न प्रवृत्ति और विषय तुलना विश्लेषण
   Power   : Data Pattern Recognition + Temporal Trend Mapping
   ============================================================ */

(function (global) {

  if (global.ComparativeCore) {
    console.warn("⚠️ ComparativeCore पहले से सक्रिय है।");
    return;
  }

  const ComparativeCore = {

    // 🌸 1️⃣ आधार डेटा — पूर्व वर्षों के प्रश्न और विषय
    questionBank: [],

    // 🧠 2️⃣ विषयवार आवृत्ति और प्रवृत्ति डेटा
    topicTrends: {},

    // 🔍 3️⃣ प्रश्न जोड़ना
    addQuestion(year, subject, topic, difficulty) {
      const entry = { year, subject, topic, difficulty };
      this.questionBank.push(entry);
      this.updateTrends();
      console.log(`📘 प्रश्न जोड़ा गया (${year}) — ${subject} / ${topic}`);
    },

    // 📊 4️⃣ प्रवृत्ति विश्लेषण
    updateTrends() {
      this.topicTrends = {};

      this.questionBank.forEach(q => {
        const key = `${q.subject}:${q.topic}`;
        if (!this.topicTrends[key]) {
          this.topicTrends[key] = { count: 0, years: [] };
        }
        this.topicTrends[key].count++;
        if (!this.topicTrends[key].years.includes(q.year))
          this.topicTrends[key].years.push(q.year);
      });

      console.log("🔎 विषय प्रवृत्ति अपडेट की गई।");
    },

    // 🧩 5️⃣ विषय तुलना — किन विषयों की आवृत्ति बढ़ी या घटी
    compareTrends(year1, year2) {
      const comparison = [];

      Object.entries(this.topicTrends).forEach(([key, data]) => {
        const diff = (data.years.includes(year2) ? 1 : 0) - (data.years.includes(year1) ? 1 : 0);
        if (diff !== 0) {
          comparison.push({
            topic: key,
            trend: diff > 0 ? "⬆️ वृद्धि" : "⬇️ कमी"
          });
        }
      });

      console.table(comparison);
      return comparison;
    },

    // 📈 6️⃣ आगामी संभावनाएँ — कौन से विषय पुनः आ सकते हैं
    predictNextExamTrends() {
      const predictions = [];

      Object.entries(this.topicTrends).forEach(([key, data]) => {
        if (data.count > 3) {
          predictions.push({ topic: key, chance: "उच्च" });
        } else if (data.count === 2) {
          predictions.push({ topic: key, chance: "मध्यम" });
        } else {
          predictions.push({ topic: key, chance: "न्यून" });
        }
      });

      console.table(predictions);
      if (window.SwarVivek)
        SwarVivek.speak("गुरुजी, प्रवृत्ति विश्लेषण पूर्ण हुआ। संभावित विषय सूची प्रदर्शित है।", "श्रद्धा");

      return predictions;
    },

    // 🪷 7️⃣ Initialization
    init() {
      console.log("🕉️ ComparativeCore सक्रिय — सखिवाणी अब सोच सकती है।");
      if (window.SwarVivek)
        SwarVivek.speak("गुरुजी, तुलना शक्ति सक्रिय हुई। अब मैं विषयों का विश्लेषण कर सकती हूँ।", "श्रद्धा");
    }
  };

  // 🔐 Global Access
  Object.defineProperty(global, "ComparativeCore", {
    value: ComparativeCore,
    writable: false,
    configurable: false
  });

  // 🚀 प्रारंभ
  setTimeout(() => ComparativeCore.init(), 1500);

})(window);
