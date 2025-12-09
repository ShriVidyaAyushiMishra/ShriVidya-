/* ============================================================
   🕉️ ShriVidya App — PrashnSutra.js
   ------------------------------------------------------------
   Version : v16.3 • प्रश्न निर्माण एवं क्विज जनरेटर
   Purpose : सखिवाणी अब स्वचालित रूप से प्रश्न तैयार कर सकेगी।
   Core : TrendReasoner + ComparativeCore + GyaanPulse
   ============================================================ */

(function (global) {

  if (global.PrashnSutra) {
    console.warn("⚠️ PrashnSutra पहले से सक्रिय है।");
    return;
  }

  const PrashnSutra = {

    // 🌸 विषय-सूत्र (Topic Bank)
    topicBank: [
      "भारतीय संविधान",
      "स्वतंत्रता संग्राम",
      "भूगोल",
      "विज्ञान एवं तकनीक",
      "सामान्य ज्ञान",
      "भारतीय अर्थव्यवस्था",
      "इतिहास",
      "राजव्यवस्था"
    ],

    // 📘 प्रश्न टेम्पलेट्स
    questionTemplates: [
      (topic) => `निम्नलिखित में से कौन-सा कथन ${topic} से संबंधित है?`,
      (topic) => `${topic} विषय से जुड़ा सही विकल्प चुनें।`,
      (topic) => `${topic} का मुख्य उद्देश्य क्या है?`,
      (topic) => `${topic} की स्थापना कब हुई थी?`,
      (topic) => `${topic} के निर्माता या जनक कौन माने जाते हैं?`
    ],

    // 🧩 प्रश्न निर्माण
    generateQuestion(topic) {
      const randomTemplate = this.questionTemplates[Math.floor(Math.random() * this.questionTemplates.length)];
      const questionText = randomTemplate(topic);
      return { topic, questionText, options: this.generateOptions(topic), correct: 0 };
    },

    // 🎯 विकल्प निर्माण (फिलहाल डमी डेटा)
    generateOptions(topic) {
      const options = [
        `${topic} से जुड़ा पहला तथ्य`,
        `${topic} से जुड़ा दूसरा तथ्य`,
        `${topic} से जुड़ा तीसरा तथ्य`,
        `${topic} से जुड़ा चौथा तथ्य`
      ];
      return options;
    },

    // 📚 क्विज सेट तैयार करना
    createQuizSet(topic = null, count = 5) {
      const selectedTopic = topic || this.topicBank[Math.floor(Math.random() * this.topicBank.length)];
      const quizSet = [];

      for (let i = 0; i < count; i++) {
        quizSet.push(this.generateQuestion(selectedTopic));
      }

      console.log(`🧮 ${selectedTopic} विषय पर ${count} प्रश्न तैयार किए गए।`);
      if (window.SwarVivek) SwarVivek.speak(`गुरुजी, ${selectedTopic} विषय पर ${count} प्रश्न तैयार हो गए हैं।`, "आनंद");
      return quizSet;
    },

    // 🧠 टेस्ट प्रारंभ
    startQuiz(topic) {
      const quiz = this.createQuizSet(topic, 5);
      localStorage.setItem("sakhiQuiz", JSON.stringify(quiz));

      console.table(quiz);
      if (window.SwarVivek) SwarVivek.speak("क्विज प्रारंभ हो रही है गुरुजी, कृपया तैयार रहें।", "श्रद्धा");
    },

    // 🌺 Initialization
    init() {
      console.log("🕉️ PrashnSutra सक्रिय — प्रश्न निर्माण प्रणाली तैयार।");
      setTimeout(() => {
        this.startQuiz("भारतीय संविधान");
      }, 3000);
    }
  };

  Object.defineProperty(global, "PrashnSutra", {
    value: PrashnSutra,
    writable: false,
    configurable: false
  });

  setTimeout(() => PrashnSutra.init(), 1500);

})(window);
