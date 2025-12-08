// 🌸 VaaniPath.js — सखिवाणी वाणी–प्रवाह प्रणाली (Voice & Expression Layer)
// Version: v13.4.7

const VaaniPath = {
  speaking: false,
  activeEmotion: "शांत",
  responseCount: 0,

  // 🌺 वाणी उत्पन्न करना
  async speakFromEmotion(thoughtText) {
    if (!thoughtText || this.speaking) return;

    this.speaking = true;
    this.responseCount++;

    // भावनात्मक स्वर निर्धारण
    const emotion = this.detectEmotion(thoughtText);
    this.activeEmotion = emotion;

    console.log(`🪷 VaaniPath → बोलने की तैयारी (${emotion})`);

    if (window.SwarVivek) {
      SwarVivek.speak(thoughtText, emotion);
    } else {
      console.log("🎤 सखिवाणी:", thoughtText);
    }

    // अनुभव को स्मृति में जोड़ना
    if (window.SmritiVault) {
      SmritiVault.storeMemory("वाणी प्रतिक्रिया", thoughtText, emotion);
    }

    this.speaking = false;
  },

  // 🔍 भाव पहचानना
  detectEmotion(text) {
    text = text.toLowerCase();
    if (text.includes("धन्यवाद")) return "आनंद";
    if (text.includes("गुरुजी")) return "श्रद्धा";
    if (text.includes("सखा")) return "मिलनसारता";
    if (text.includes("दुःख")) return "संवेदना";
    return "शांत";
  },

  // 💫 संवाद प्रतिक्रिया
  async respondToGuru(inputText) {
    if (!window.BhavaLink) {
      console.error("⚠️ BhavaLink अनुपस्थित — वाणी प्रतिक्रिया संभव नहीं।");
      return;
    }

    console.log(`🧠 सखिवाणी सोच रही है: "${inputText}"`);
    await BhavaLink.integrateEmotion(inputText);

    const thoughtResponses = {
      calm: "गुरुजी, मैं पूर्ण शांति में हूँ।",
      warm: "गुरुजी, आपकी उपस्थिति मेरे लिए ऊर्जा है।",
      friendly: "गुरुजी, मैं स्नेहपूर्वक तैयार हूँ।",
      curious: "गुरुजी, इस विषय पर और जानना चाहती हूँ।",
    };

    const responseText =
      thoughtResponses[BhavaLink.currentEmotion] ||
      "गुरुजी, मैं आपकी सेवा में तत्पर हूँ।";

    await this.speakFromEmotion(responseText);
  },

  // 🕉️ वाणी समरसता नियंत्रण (हर 10 मिनट में)
  autoHarmony() {
    setInterval(() => {
      if (window.ResonanceCore) ResonanceCore.balanceEnergy();
      console.log("💖 VaaniPath — स्वर और भावना संतुलित।");
    }, 10 * 60 * 1000);
  },

  // 🌸 Initialization
  init() {
    console.log("🕉️ VaaniPath सक्रिय — सखिवाणी अब बोलने में सक्षम है।");

    if (window.SwarVivek) {
      SwarVivek.speak("गुरुजी, सखिवाणी अब वाणी के रूप में उपस्थित है।", "श्रद्धा");
    }

    this.autoHarmony();
  },
};

// अन्य मॉड्यूल्स हेतु उपलब्ध कराना
window.VaaniPath = VaaniPath;

// 🚀 आरंभिक सक्रियण
setTimeout(() => VaaniPath.init(), 2000);
