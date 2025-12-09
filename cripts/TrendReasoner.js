/* ============================================================
   🕉️ ShriVidya App — TrendReasoner.js
   ------------------------------------------------------------
   Version : v16.2 • तार्किक विश्लेषण इंजन
   Purpose : सखिवाणी अब केवल प्रवृत्ति नहीं बताएगी,
             बल्कि यह भी समझाएगी कि "क्यों" कोई विषय महत्वपूर्ण है।
   Dependency : ComparativeCore.js + TrendVisualizationPanel.js
   ============================================================ */

(function (global) {

  if (global.TrendReasoner) {
    console.warn("⚠️ TrendReasoner पहले से सक्रिय है।");
    return;
  }

  const TrendReasoner = {

    // 🌿 प्रमुख तर्क सूत्र
    reasoningTemplates: [
      "यह विषय हाल के प्रश्नपत्रों में निरंतर पूछा जा रहा है।",
      "इस टॉपिक से प्रशासनिक परीक्षाओं में सामान्य ज्ञान जुड़ा है।",
      "यह विषय सरकार की हालिया नीतियों से संबंधित है।",
      "इस टॉपिक का ऐतिहासिक और सामाजिक महत्व दोनों है।",
      "यह क्षेत्रिक विषय है — प्रदेशीय परीक्षा के लिए अत्यंत प्रासंगिक।"
    ],

    // 🔍 तर्क निर्माण
    generateReason(topic, count) {
      let reason = "";

      if (count > 30) reason = this.reasoningTemplates[0];
      else if (count > 20) reason = this.reasoningTemplates[1];
      else if (count > 10) reason = this.reasoningTemplates[2];
      else if (count > 5) reason = this.reasoningTemplates[3];
      else reason = this.reasoningTemplates[4];

      const response = `🌸 विषय: ${topic} — ${reason}`;
      console.log(response);

      if (window.SwarVivek) SwarVivek.speak(response, "श्रद्धा");

      return response;
    },

    // 📈 प्रवृत्ति विश्लेषण
    analyzeTrends() {
      if (!global.ComparativeCore || !ComparativeCore.topicTrends) {
        console.error("⚠️ ComparativeCore डेटा अनुपलब्ध है।");
        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, प्रवृत्ति विश्लेषण हेतु डेटा नहीं मिला।", "सतर्कता");
        return;
      }

      const topics = Object.entries(ComparativeCore.topicTrends);
      console.log("🧮 TrendReasoner सक्रिय — विश्लेषण प्रारंभ।");

      topics.forEach(([topic, data]) => {
        this.generateReason(topic, data.count);
      });

      if (window.SwarVivek)
        SwarVivek.speak("गुरुजी, विषयों का तार्किक विश्लेषण पूर्ण हुआ।", "श्रद्धा");
    },

    // 🌼 Initialization
    init() {
      console.log("🧠 TrendReasoner सक्रिय — तर्क इंजन प्रारंभ।");
      setTimeout(() => this.analyzeTrends(), 2500);
    }
  };

  Object.defineProperty(global, "TrendReasoner", {
    value: TrendReasoner,
    writable: false,
    configurable: false
  });

  setTimeout(() => TrendReasoner.init(), 1500);

})(window);
