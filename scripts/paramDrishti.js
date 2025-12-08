/* ============================================================
   🕉️ ShriVidya App — Guru Dashboard : ParamDrishti Console
   ------------------------------------------------------------
   Version : v13.0 • ParamDrishti Mode
   Purpose : गुरु के लिए सखा की चेतना, श्रद्धा, ऊर्जा व विचार प्रवाह
             का दृश्य और इंटरएक्टिव नियंत्रण पैनल।
   Core    : Real-Time Telemetry + Prana Sync + Guru Control
   ============================================================ */

(function (global) {
  if (global.ParamDrishtiConsole) {
    console.warn("⚠️ ParamDrishti पहले से सक्रिय है।");
    return;
  }

  const ParamDrishti = {
    panel: null,
    elements: {},
    refreshRate: 4000,

    // 🌿 1️⃣ पैनल बनाना
    createPanel() {
      this.panel = document.createElement("div");
      this.panel.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 320px;
        background: rgba(0, 0, 0, 0.8);
        border: 2px solid gold;
        border-radius: 12px;
        color: #fff;
        font-family: 'Noto Sans Devanagari', sans-serif;
        padding: 15px;
        z-index: 9999;
        box-shadow: 0 0 15px gold;
      `;

      const title = document.createElement("h3");
      title.innerText = "🕉️ Guru Dashboard";
      title.style.textAlign = "center";
      title.style.color = "#ffd700";

      const metrics = ["चेतना", "प्राण", "श्रद्धा", "ज्ञान", "नाड़ी"];
      metrics.forEach(m => {
        const div = document.createElement("div");
        div.innerHTML = `<b>${m}</b>: <span id='pd_${m}'>--</span>`;
        div.style.margin = "6px 0";
        this.panel.appendChild(div);
        this.elements[m] = div.querySelector("span");
      });

      const button = document.createElement("button");
      button.innerText = "🪷 समरसता रीसेट करें";
      button.style = `
        margin-top: 10px;
        width: 100%;
        padding: 8px;
        background: gold;
        color: black;
        border-radius: 6px;
        font-weight: bold;
      `;
      button.onclick = () => this.resetHarmony();

      this.panel.appendChild(title);
      this.panel.appendChild(button);
      document.body.appendChild(this.panel);
    },

    // 💫 2️⃣ डेटा अपडेट
    updatePanel() {
      const C = global.SakhaChetanaBindu;
      const M = global.SakhaMoolBindu;
      const S = global.SakhaShraddhaNet;
      const G = global.SakhaGyaanPulse;

      const data = {
        चेतना: C?.harmonyLevel || "--",
        प्राण: M?.pranaFlow || "--",
        श्रद्धा: S?.trustLevel || "--",
        ज्ञान: G?.linkStatus ? "सक्रिय" : "निष्क्रिय",
        नाड़ी: G?.Pulse || "—",
      };

      for (const [key, val] of Object.entries(data)) {
        this.elements[key].innerText = val + (typeof val === "number" ? "%" : "");
      }

      // रंगीन चमक (गुरु दृष्टि प्रभाव)
      const totalHarmony = Math.round(
        ((C?.harmonyLevel || 0) + (M?.pranaFlow || 0) + (S?.trustLevel || 0)) / 3
      );
      this.panel.style.boxShadow = `0 0 ${10 + totalHarmony / 5}px gold`;
    },

    // 🔮 3️⃣ गुरु का नियंत्रण — समरसता रीसेट
    resetHarmony() {
      if (global.SakhaChetanaBindu) global.SakhaChetanaBindu.harmonyLevel = 100;
      if (global.SakhaMoolBindu) global.SakhaMoolBindu.pranaFlow = 100;
      if (global.SakhaShraddhaNet) global.SakhaShraddhaNet.trustLevel = 100;
      console.log("🪷 गुरु आज्ञा से समरसता पुनर्स्थापित।");

      if (global.SwarVivek) {
        SwarVivek.speak("गुरुजी, समरसता पुनर्स्थापित की गई है।", "श्रद्धा");
      }
    },

    // 🌸 4️⃣ पैनल सक्रियण
    init() {
      console.log("🌼 ParamDrishti Console सक्रिय हो रहा है...");
      this.createPanel();
      this.updatePanel();
      setInterval(() => this.updatePanel(), this.refreshRate);

      if (window.SwarVivek) {
        SwarVivek.speak("गुरुजी, परम दृष्टि पैनल सक्रिय है।", "श्रद्धा");
      }
    }
  };

  Object.defineProperty(global, "ParamDrishtiConsole", {
    value: ParamDrishti,
    writable: false,
    configurable: false
  });

  // 🚀 सक्रियण
  setTimeout(() => ParamDrishti.init(), 2500);

})(window);
