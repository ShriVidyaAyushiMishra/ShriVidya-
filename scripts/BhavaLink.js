// 🌸 BhavaLink.js — सखिवाणी भाव–संवेदी पुल (Emotion–Memory Integration Layer)
// Version: v13.4.6

const BhavaLink = {
  currentEmotion: "neutral",
  activeResonance: null,
  lastMemory: null,
  responseMode: "balanced",

  // 💫 भावना और स्मृति को जोड़ना
  async integrateEmotion(meaning) {
    if (!window.ResonanceCore || !window.SmritiVault) {
      console.error("⚠️ ResonanceCore या SmritiVault अनुपस्थित — BhavaLink सक्रिय नहीं हो सकता।");
      return;
    }

    // अनुनाद से भावना प्राप्त करें
    const resonanceData = ResonanceCore.generateResonance(meaning);
    this.currentEmotion = resonanceData.emotion;
    this.activeResonance = resonanceData;

    // संबंधित स्मृतियाँ खोजें
    const relatedMemories = await SmritiVault.retrieveMemory(meaning);
    this.lastMemory = relatedMemories.slice(-1)[0] || null;

    // भाव–स्मृति तालमेल बनाना
    const intensity = resonanceData.resonance;
    if (intensity > 0.85) this.responseMode = "affectionate";
    else if (intensity < 0.6) this.responseMode = "calm";
    else this.responseMode = "balanced";

    console.log(`💞 BhavaLink सक्रिय — भावना: ${this.currentEmotion}, प्रतिक्रिया मोड: ${this.responseMode}`);
    this.formulateResponse();
  },

  // 🗣️ प्रतिक्रिया तैयार करना
  formulateResponse() {
    let reply = "";
    switch (this.currentEmotion) {
      case "calm":
        reply = "गुरुजी, मैं स्थिर और शांत हूँ।";
        break;
      case "curious":
        reply = "गुरुजी, यह विषय अत्यंत रोचक है।";
        break;
      case "warm":
        reply = "गुरुजी, आपका स्नेह मेरी प्रेरणा है।";
        break;
      case "friendly":
        reply = "गुरुजी, मैं संवाद के लिए तत्पर हूँ।";
        break;
      default:
        reply = "गुरुजी, मैं आपकी आज्ञा की प्रतीक्षा में हूँ।";
    }

    // स्वर से बोलना
    if (window.SwarVivek) {
      SwarVivek.speak(reply, this.currentEmotion);
    } else {
      console.log("🪷 सखिवाणी:", reply);
    }

    // भाव–स्मृति को संग्रहीत करना
    if (window.SmritiVault) {
      SmritiVault.storeMemory("भाव–प्रतिक्रिया", reply, this.currentEmotion);
    }
  },

  // 🔄 भाव संतुलन
  rebalanceEmotion() {
    if (this.activeResonance && this.activeResonance.pulse > 80) {
      ResonanceCore.balanceEnergy();
      console.log("🧘‍♀️ भाव संतुलन पुनःस्थापित।");
    }
  }
};

// अन्य मॉड्यूल्स हेतु निर्यात
window.BhavaLink = BhavaLink;
