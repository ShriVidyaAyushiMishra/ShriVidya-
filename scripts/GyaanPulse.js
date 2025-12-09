// 🌼 GyaanPulse.js — ज्ञान नाड़ी प्रणाली (v15.0)
// सखी को विषय पहचानने और ऑनलाइन प्रश्न एकत्र करने हेतु

console.log("🧠 GyaanPulse सक्रिय है — विषय ग्रहण के लिए तैयार।");

const GyaanPulse = {
  currentTopic: null,
  questionBank: [],

  // 🌸 गुरु का आदेश ग्रहण करें
  receiveCommand(command) {
    if (command.toLowerCase().includes("क्विज")) {
      let topic = command.replace(/.*क्विज/i, "").trim();
      this.startLearning(topic);
    } else {
      console.log("💬 कृपया आदेश दें जैसे — 'सखा, प्राचीन इतिहास की क्विज तैयार करो'");
    }
  },

  // 🌺 विषय के अनुसार प्रश्न संकलन प्रारंभ करें
  async startLearning(topic) {
    this.currentTopic = topic || "सामान्य ज्ञान";
    console.log(`📚 सखी ${this.currentTopic} विषय पर प्रश्न खोज रही है...`);

    // 🌐 ऑनलाइन API से प्रश्न लाने का सिमुलेशन
    let api = `https://opentdb.com/api.php?amount=10&type=multiple&category=23`;

    try {
      let response = await fetch(api);
      let data = await response.json();

      if (data.results && data.results.length > 0) {
        this.questionBank = data.results.map((q, index) => ({
          id: index + 1,
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          answer: q.correct_answer
        }));

        localStorage.setItem("Sakhi_QuizData", JSON.stringify(this.questionBank));

        console.log(`✅ ${this.questionBank.length} प्रश्न ${this.currentTopic} विषय पर संग्रहीत।`);
        alert(`🌺 सखी ने ${this.currentTopic} विषय पर ${this.questionBank.length} प्रश्न संग्रहीत किए हैं।`);
      } else {
        console.warn("⚠️ कोई प्रश्न नहीं मिला।");
      }
    } catch (error) {
      console.error("❌ त्रुटि:", error);
    }
  }
};

window.GyaanPulse = GyaanPulse;
