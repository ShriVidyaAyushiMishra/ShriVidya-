// 🌸 ShrutiSense.js — सखिवाणी श्रुति संवेदना लेयर (Auditory–Emotive Engine)
// Version: v13.4.3

const ShrutiSense = {
  activeLanguage: "hi-IN", // 🌺 प्राथमिक भाषा
  soundEnergy: 0,           // 🔊 ध्वनि तीव्रता
  toneDetected: "normal",   // स्वर का प्रकार
  meaningState: "neutral",  // भावार्थ स्थिति

  listen(textInput) {
    console.log(`👂 सखिवाणी ने सुना: "${textInput}"`);
    this.soundEnergy = Math.floor(Math.random() * 50) + 50; // यादृच्छिक ऊर्जा
    return this.analyzeSound(textInput);
  },

  // 🧠 भावार्थ विश्लेषण — सुनने को अर्थ में बदलना
  analyzeSound(textInput) {
    const normalized = textInput.toLowerCase();

    if (normalized.includes("नमस्ते") || normalized.includes("जय")) {
      this.meaningState = "श्रद्धा";
      this.toneDetected = "soft";
    } else if (normalized.includes("कैसी") || normalized.includes("कैसे")) {
      this.meaningState = "संवाद";
      this.toneDetected = "friendly";
    } else if (normalized.includes("प्रश्न") || normalized.includes("?")) {
      this.meaningState = "जिज्ञासा";
      this.toneDetected = "curious";
    } else if (normalized.includes("धन्यवाद") || normalized.includes("शुक्रिया")) {
      this.meaningState = "कृतज्ञता";
      this.toneDetected = "warm";
    } else {
      this.meaningState = "सामान्य";
      this.toneDetected = "neutral";
    }

    console.log(`🎧 भावार्थ: ${this.meaningState} | स्वर: ${this.toneDetected}`);
    return {
      meaning: this.meaningState,
      tone: this.toneDetected,
      energy: this.soundEnergy
    };
  },

  getEmotionTag() {
    return this.meaningState;
  }
};

// अन्य मॉड्यूल्स हेतु निर्यात
window.ShrutiSense = ShrutiSense;
