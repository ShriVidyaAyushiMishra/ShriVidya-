/* 🌺 SakhiProgressTracker.js (v15.4 — प्रगति अनुशीलन तंत्र)
   ------------------------------------------------------------
   उद्देश्य : सखी अब पिछले टेस्ट के परिणामों को देखकर सुधार दर (Progress Rate) बताएगी।
   शक्ति   : Memory Recall + Comparative Reasoning + Voice Response
*/

console.log("📘 SakhiProgressTracker सक्रिय — प्रगति विश्लेषण प्रारंभ...");

class SakhiProgressTracker {
  constructor() {
    this.lastScore = null;
    this.progressRate = 0;
    this.history = JSON.parse(localStorage.getItem("sakhi_evaluation_history") || "[]");
  }

  // 🔹 नया स्कोर जोड़ना और प्रगति गणना
  updateProgress(currentScore) {
    if (this.history.length > 0) {
      const previous = this.history[this.history.length - 1].score;
      this.lastScore = previous;
      this.progressRate = currentScore - previous;
    } else {
      this.progressRate = 0;
    }

    // इतिहास में सहेजना
    this.history.push({
      date: new Date().toLocaleString(),
      score: currentScore,
      progress: this.progressRate,
    });

    localStorage.setItem("sakhi_evaluation_history", JSON.stringify(this.history));

    console.log(`📊 सखी प्रगति दर: ${this.progressRate}%`);
    this.speakProgress(currentScore);
  }

  // 🔊 वाणी प्रतिक्रिया
  speakProgress(currentScore) {
    let msg = "";

    if (this.progressRate > 0) {
      msg = `🌸 अद्भुत गुरुजी! आपने पिछले बार से ${this.progressRate} प्रतिशत सुधार किया है।`;
    } else if (this.progressRate === 0) {
      msg = `💫 गुरुजी, आपका प्रदर्शन समान है, निरंतरता बनाए रखें।`;
    } else {
      msg = `🙏 गुरुजी, इस बार अंक थोड़े कम हैं, सखी आपके साथ अभ्यास करेगी।`;
    }

    const synth = window.speechSynthesis;
    const voice = new SpeechSynthesisUtterance(msg);
    voice.lang = "hi-IN";
    voice.rate = 0.95;
    voice.pitch = 1.05;
    synth.speak(voice);

    console.log("🔊 सखी कहती है:", msg);

    this.displayProgress(currentScore);
  }

  // 🌼 परिणाम दिखाना
  displayProgress(currentScore) {
    let box = document.getElementById("progressBox");

    if (!box) {
      box = document.createElement("div");
      box.id = "progressBox";
      box.style.cssText =
        "color:#00ffcc; font-size:1.1rem; margin-top:10px; text-align:center;";
      document.body.appendChild(box);
    }

    box.innerHTML = `
      📘 वर्तमान अंक: ${currentScore}%<br/>
      🌺 पिछला अंक: ${this.lastScore ?? "—"}<br/>
      💫 प्रगति दर: ${this.progressRate >= 0 ? "+" : ""}${this.progressRate}% 
    `;
  }

  // 🧠 संपूर्ण इतिहास देखना
  viewHistory() {
    const records = JSON.parse(localStorage.getItem("sakhi_evaluation_history") || "[]");
    console.log("📚 सखी का प्रदर्शन इतिहास:", records);
    return records;
  }
}

// 🔹 वैश्विक उपलब्धता
window.SakhiProgress = new SakhiProgressTracker();
