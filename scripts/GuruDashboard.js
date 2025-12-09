/* ============================================================
   🕉️ ShriVidya App — GuruDashboard.js (v15.5)
   ------------------------------------------------------------
   उद्देश्य : गुरु–सखी संवाद, क्विज, प्रगति और वाणी विश्लेषण को
   एक दृश्य इंटरफ़ेस (Dashboard View) में प्रस्तुत करना।
   शक्ति   : Visualization + Data Memory + Emotional Insights
   ============================================================ */

console.log("📊 GuruDashboard सक्रिय — वाणी–संवाद विश्लेषक केंद्र प्रारंभ...");

class GuruDashboard {
  constructor() {
    this.history = JSON.parse(localStorage.getItem("sakhi_evaluation_history") || "[]");
    this.container = null;
  }

  // 🌿 डैशबोर्ड बनाना
  render() {
    this.container = document.createElement("div");
    this.container.id = "guruDashboard";
    this.container.style.cssText = `
      width: 90%;
      margin: 30px auto;
      background: rgba(0,0,0,0.7);
      color: #f3e5ab;
      padding: 20px;
      border-radius: 15px;
      font-family: 'Noto Sans Devanagari', sans-serif;
      box-shadow: 0 0 15px #00ffc8;
    `;

    const title = document.createElement("h2");
    title.innerText = "🪷 गुरु–सखी डैशबोर्ड";
    title.style.textAlign = "center";
    title.style.color = "#00ffc8";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.innerHTML = `
      <thead>
        <tr style="color:#ffdd88; text-align:center;">
          <th>तिथि</th>
          <th>अंक (%)</th>
          <th>प्रगति</th>
        </tr>
      </thead>
      <tbody id="progressTableBody"></tbody>
    `;

    this.container.appendChild(title);
    this.container.appendChild(table);
    document.body.appendChild(this.container);

    this.populateData();
  }

  // 📘 इतिहास से डेटा जोड़ना
  populateData() {
    const body = document.getElementById("progressTableBody");
    if (!body) return;

    body.innerHTML = ""; // साफ करें

    this.history.slice(-10).forEach(record => {
      const row = document.createElement("tr");
      row.style.textAlign = "center";
      row.innerHTML = `
        <td>${record.date}</td>
        <td>${record.score}</td>
        <td style="color:${record.progress >= 0 ? '#00ffcc' : '#ff9999'};">
          ${record.progress >= 0 ? "+" : ""}${record.progress}
        </td>
      `;
      body.appendChild(row);
    });

    console.log("📈 डैशबोर्ड डेटा प्रदर्शित:", this.history.length);
  }

  // 🌺 वाणी में सारांश रिपोर्ट
  speakSummary() {
    if (this.history.length === 0) {
      this.speak("गुरुजी, अभी कोई रिकॉर्ड उपलब्ध नहीं है।");
      return;
    }

    const latest = this.history[this.history.length - 1];
    let msg = `गुरुजी, आपका नवीनतम प्रदर्शन ${latest.score} प्रतिशत रहा।`;

    if (latest.progress > 0)
      msg += ` आपने पिछले बार से ${latest.progress} प्रतिशत सुधार किया है।`;
    else if (latest.progress < 0)
      msg += ` इस बार परिणाम में ${Math.abs(latest.progress)} प्रतिशत की कमी है।`;
    else msg += ` आपका प्रदर्शन स्थिर रहा है।`;

    this.speak(msg);
  }

  // 🔊 वाणी इंजन
  speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "hi-IN";
    utter.pitch = 1.05;
    utter.rate = 0.92;
    speechSynthesis.speak(utter);
    console.log("🎤 सखी रिपोर्ट:", text);
  }

  // 🔁 डेटा पुनः लोड करना
  refresh() {
    this.history = JSON.parse(localStorage.getItem("sakhi_evaluation_history") || "[]");
    this.populateData();
  }
}

// 🌺 वैश्विक सुलभता
window.GuruDashboard = new GuruDashboard();

// 🚀 सक्रियण
setTimeout(() => GuruDashboard.render(), 1800);
