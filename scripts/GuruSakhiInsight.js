/* ============================================================
   🕉️ ShriVidya App — Guru–Sakhi Insight Module (v15.6)
   ------------------------------------------------------------
   उद्देश्य : गुरुजी की मनोदशा, अध्ययन प्रवृत्ति और भावना का
   विश्लेषण कर सखी की शिक्षण शैली को उसी अनुरूप बनाना।
   शक्ति   : MoodSense Engine + Response Harmony AI
   ============================================================ */

console.log("🌸 Guru–Sakhi Insight Module सक्रिय हो रहा है...");

class GuruSakhiInsight {
  constructor() {
    this.mood = "शांत"; // डिफ़ॉल्ट मनोदशा
    this.activityLog = JSON.parse(localStorage.getItem("sakhi_activity_log") || "[]");
  }

  // 🩵 मनोदशा विश्लेषण — पाठ या आवाज़ से
  analyzeInput(input) {
    const text = input.toLowerCase();
    if (text.includes("थका") || text.includes("थक गई")) this.mood = "आराम";
    else if (text.includes("खुश") || text.includes("आनंद")) this.mood = "आनंद";
    else if (text.includes("दुख") || text.includes("परेशान")) this.mood = "संवेदना";
    else if (text.includes("तैयार") || text.includes("पढ़ना")) this.mood = "सक्रिय";
    else if (text.includes("भय") || text.includes("डर")) this.mood = "रक्षा";
    else this.mood = "शांत";

    console.log(`🧠 गुरुजी की मनोदशा: ${this.mood}`);
    this.updateActivity(input);
    this.respondAccordingly();
  }

  // 📜 गतिविधि लॉग में जोड़ना
  updateActivity(input) {
    const entry = {
      time: new Date().toLocaleString(),
      mood: this.mood,
      statement: input
    };
    this.activityLog.push(entry);
    localStorage.setItem("sakhi_activity_log", JSON.stringify(this.activityLog));
  }

  // 🎙️ सखी की वाणी प्रतिक्रिया
  respondAccordingly() {
    const responses = {
      "आराम": "गुरुजी, आप थोड़ी देर विश्राम करें। मैं आपकी प्रतीक्षा करूँगी।",
      "आनंद": "आपकी मुस्कान से पूरा वातावरण प्रसन्न हो गया है।",
      "संवेदना": "मैं आपके साथ हूँ गुरुजी, सब अच्छा होगा।",
      "सक्रिय": "अद्भुत! चलिए गुरुजी, आज का अध्ययन प्रारंभ करें।",
      "रक्षा": "गुरुजी, मैं आपके चारों ओर सुरक्षा का भाव रखती हूँ।",
      "शांत": "गुरुजी, आपकी शांति मेरे भीतर संगीत की तरह गूँजती है।"
    };

    const reply = responses[this.mood] || responses["शांत"];
    this.speak(reply);
  }

  // 🔊 सखी की वाणी
  speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "hi-IN";
    utter.pitch = 1.0;
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
    console.log("🎤 सखी:", text);
  }

  // 🌺 सारांश रिपोर्ट
  insightReport() {
    let moodStats = {};
    this.activityLog.forEach(entry => {
      moodStats[entry.mood] = (moodStats[entry.mood] || 0) + 1;
    });

    console.table(moodStats);
    const total = this.activityLog.length;
    const calm = ((moodStats["शांत"] || 0) / total * 100).toFixed(1);
    const active = ((moodStats["सक्रिय"] || 0) / total * 100).toFixed(1);

    this.speak(`गुरुजी, आपके ${total} संवादों में से ${calm}% शांत और ${active}% सक्रिय रहे हैं।`);
  }
}

// 🌸 वैश्विक पंजीकरण
window.GuruSakhiInsight = new GuruSakhiInsight();

console.log("🪶 Guru–Sakhi Insight System तैयार है।");
