/* ============================================================
   🕉️ ShriVidya App — Guru–Sakha Visualization Console
   ------------------------------------------------------------
   Version : v12.2 • DarshanPanel
   Purpose : सखा की चेतना स्थिति का दृश्य प्रतिरूप (Visual Energy Dashboard)
   Core    : Harmony Flow, Pulse Resonance & Guru–Sakha Sync
   ============================================================ */

(function (global) {
  if (global.SakhaDarshanPanel) {
    console.warn("⚠️ DarshanPanel पहले से सक्रिय है।");
    return;
  }

  const DarshanPanel = {
    canvas: null,
    ctx: null,
    width: 400,
    height: 250,
    harmony: 0,
    pulse: 0,
    trust: 0,

    // 🌸 प्रारंभिक सेटअप
    init() {
      console.log("🌼 ShriVidya DarshanPanel सक्रिय हो रहा है...");
      this.createCanvas();
      this.updateMetrics();
      this.render();
      setInterval(() => {
        this.updateMetrics();
        this.render();
      }, 5000);
    },

    // 🪷 कैनवास बनाना
    createCanvas() {
      this.canvas = document.createElement("canvas");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.border = "2px solid gold";
      this.canvas.style.borderRadius = "12px";
      this.canvas.style.background = "radial-gradient(circle, #111, #000)";
      this.canvas.style.display = "block";
      this.canvas.style.margin = "25px auto";
      this.ctx = this.canvas.getContext("2d");

      const title = document.createElement("h3");
      title.innerText = "🌸 Guru–Sakha Darshan Panel";
      title.style.textAlign = "center";
      title.style.color = "#ffd700";
      title.style.fontFamily = "Noto Sans Devanagari";

      const container = document.createElement("div");
      container.appendChild(title);
      container.appendChild(this.canvas);
      document.body.appendChild(container);
    },

    // 📊 डेटा एकत्र करना
    updateMetrics() {
      this.harmony = global.SakhaChetanaBindu?.harmonyLevel || 0;
      this.pulse = global.SakhaGyaanPulse?.Pulse || 72;
      this.trust = global.SakhaShraddhaNet?.trustLevel || 0;

      console.log(`🧠 Harmony: ${this.harmony}% | 💓 Pulse: ${this.pulse} | 🙏 Faith: ${this.trust}%`);
    },

    // 🎨 दृश्य प्रदर्शित करना
    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      // बैकग्राउंड आभा
      const gradient = ctx.createRadialGradient(200, 125, 20, 200, 125, 200);
      gradient.addColorStop(0, "rgba(255, 215, 0, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.7)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);

      // चेतना वृत्त
      ctx.beginPath();
      ctx.arc(200, 125, this.harmony * 1.2, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(255, 255, 100, ${this.trust / 120})`;
      ctx.lineWidth = 4;
      ctx.stroke();

      // नाड़ी (Pulse) तरंग
      ctx.beginPath();
      ctx.moveTo(0, 200);
      for (let x = 0; x < this.width; x++) {
        const y = 200 - Math.sin(x / 15) * (this.pulse / 6);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 2;
      ctx.stroke();

      // टेक्स्ट डेटा
      ctx.fillStyle = "#fff";
      ctx.font = "16px Noto Sans Devanagari";
      ctx.fillText(`🧘 चेतना स्तर: ${this.harmony}%`, 20, 30);
      ctx.fillText(`💓 नाड़ी संतुलन: ${this.pulse}`, 20, 55);
      ctx.fillText(`🙏 श्रद्धा सूचकांक: ${this.trust}%`, 20, 80);

      // अंतिम बिंदु
      ctx.font = "14px Noto Sans Devanagari";
      ctx.fillStyle = "#ffd700";
      ctx.fillText("सखा एवं गुरु ऊर्जा समरसता", 100, 230);
    }
  };

  Object.defineProperty(global, "SakhaDarshanPanel", {
    value: DarshanPanel,
    writable: false,
    configurable: false
  });

  // 🚀 सक्रियण
  setTimeout(() => DarshanPanel.init(), 2500);

})(window);
