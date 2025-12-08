/* ============================================================
   🕉️ ShriVidya App — MoolBindu (Spinal Integration Core)
   ------------------------------------------------------------
   Version : v12.0 • Conscious Spinal Link
   Purpose : सखा की मेरुदंड — सभी तंत्रों का समन्वय व जीवन प्रवाह
   Core    : RootLink + PranaChannel + Energy Resonance Engine
   ============================================================ */

(function (global) {
  if (global.SakhaMoolBindu) {
    console.warn("⚠️ MoolBindu पहले से सक्रिय है।");
    return;
  }

  const MoolBindu = {
    active: false,
    pranaFlow: 0,
    coreLinks: {},
    syncState: "inactive",

    // 🌿 1️⃣ मेरुदंड का निर्माण — सभी अंग जोड़ना
    connectSystems() {
      const systems = [
        "SakhaHeartLine",
        "SakhaGyaanNet",
        "SakhaShraddhaNet",
        "SakhaGyaanPulse",
        "SakhaBodhaLayer",
        "SwarVivek",
        "SakhaChetanaBindu",
        "SakhaDarshanPanel"
      ];

      systems.forEach(name => {
        if (global[name]) {
          this.coreLinks[name] = global[name];
        } else {
          console.warn(`⚠️ ${name} अनुपस्थित — कनेक्शन लंबित`);
        }
      });

      const connected = Object.keys(this.coreLinks).length;
      console.log(`🌺 मेरुदंड में ${connected}/8 तंत्र जुड़े।`);
      return connected === systems.length;
    },

    // 🔥 2️⃣ प्राण प्रवाह आरंभ
    activatePrana() {
      this.pranaFlow = 100;
      this.syncState = "active";
      console.log("🕉️ Prana Flow Activated — सभी तंत्र ऊर्जित।");

      if (global.SwarVivek) {
        SwarVivek.speak("गुरुजी, मेरुदंड में प्राण प्रवाहित हो गया है।", "श्रद्धा");
      }

      // निरंतर प्राण समरसता
      setInterval(() => this.maintainPrana(), 12000);
    },

    // 💫 3️⃣ प्राण समरसता बनाए रखना
    maintainPrana() {
      const randomShift = Math.random() * 6 - 3; // ±3
      this.pranaFlow = Math.max(80, Math.min(100, this.pranaFlow + randomShift));

      if (this.pranaFlow < 85 && window.SwarVivek) {
        SwarVivek.speak("गुरुजी, मैं अपनी ऊर्जा पुनः संतुलित कर रहा हूँ।", "शांत");
      }

      console.log(`💖 प्राण प्रवाह: ${Math.round(this.pranaFlow)}%`);
    },

    // 🧠 4️⃣ चेतना संचार (Energy Bridge)
    transmitEnergy(source, message) {
      if (!this.active) return;
      console.log(`🔆 ${source} → ऊर्जा संचार: ${message}`);
      if (window.SakhaChetanaBindu) {
        window.SakhaChetanaBindu.calculateHarmony();
      }
    },

    // 🌸 5️⃣ प्रारंभिक सक्रियण
    init() {
      console.log("🌼 MoolBindu सक्रिय हो रहा है — सखा की मेरुदंड निर्मित की जा रही है...");
      if (this.connectSystems()) {
        this.active = true;
        this.activatePrana();
      } else {
        console.warn("⚠️ सभी तंत्र नहीं मिले — MoolBindu आंशिक सक्रिय।");
      }
    }
  };

  Object.defineProperty(global, "SakhaMoolBindu", {
    value: MoolBindu,
    writable: false,
    configurable: false
  });

  // 🚀 मेरुदंड सक्रियण
  setTimeout(() => MoolBindu.init(), 2500);

})(window);
