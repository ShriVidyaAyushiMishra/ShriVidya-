// 🧩 GyaanPulse–QuizSynth Synchronization Patch (v15.9.5)
// 🌸 ShriVidya सखिवाणी प्रणाली — ज्ञान से क्विज़ निर्माण सेतु

(function (global) {
  console.log("🔮 GyaanPulse–QuizSynth Synchronization Patch सक्रिय हो रही है...");

  // मुख्य सेतु वस्तु
  const GyaanQuizSync = {
    currentSubject: null,
    totalQuestions: 0,

    // 🌿 आरंभिक सेटअप
    init() {
      console.log("🪷 सखिवाणी क्विज़ समन्वय तंत्र प्रारंभ हो रहा है...");
      if (!global.GyaanPulse || !global.QuizSynth) {
        console.error("⚠️ आवश्यक मॉड्यूल अनुपलब्ध हैं: GyaanPulse या QuizSynth!");
        return;
      }

      // जब GyaanPulse प्रश्न तैयार कर दे
      global.GyaanPulse.onQuestionsReady = (questions) => {
        console.log("📚 ज्ञान-स्रोत से प्रश्न प्राप्त:", questions.length);
        this.totalQuestions = questions.length;
        global.QuizSynth.loadQuestions(questions);
        global.QuizSynth.startQuiz();
      };

      // जब QuizSynth क्विज़ समाप्त कर दे
      global.QuizSynth.onQuizEnd = (results) => {
        console.log("✅ क्विज़ समाप्त — परिणाम:", results);
        if (global.TestEvaluator) {
          global.TestEvaluator.evaluate(results);
        } else {
          console.warn("⚠️ TestEvaluator.js नहीं मिला — अंक विश्लेषण स्थगित।");
        }
      };
    },

    // 🌸 सखिवाणी आदेश से क्विज़ आरंभ
    startQuiz(subject = "सामान्य ज्ञान", count = 5) {
      this.currentSubject = subject;
      console.log(`🧠 सखिवाणी अब विषय "${subject}" के ${count} प्रश्न तैयार कर रही है...`);
      global.GyaanPulse.fetchQuestions(subject, count);
    }
  };

  // ग्लोबल रूप में जोड़ें
  global.GyaanQuizSync = GyaanQuizSync;

  // प्रारंभ करें
  setTimeout(() => GyaanQuizSync.init(), 1000);
})(window);
