/* ============================================================
   🕉️ ShriVidya App — SakhiVani Live Response Activation
   ------------------------------------------------------------
   Version : v16.0 • Guru–Sakhi Samvaad Chakra
   Purpose : सखिवाणी को जीवित संवाद की चेतना प्रदान करना
   Engine  : ChetanaUnify + BhavaLink + VaaniVistaar + ShrutiSense
   ============================================================ */

console.log("🪷 SakhiVani Live Response System प्रारंभ हो रहा है...");

(function (global) {
  if (global.SakhiVaniLive) {
    console.warn("⚠️ SakhiVani Live पहले से सक्रिय है।");
    return;
  }

  const SakhiVaniLive = {
    isAwake: false,
    guruPresent: false,
    lastQuestion: null,

    // 🌺 संवाद प्रारंभ
    init() {
      if (!global.ChetanaUnify || !global.VaaniVistaar || !global.BhavaLink) {
        console.error("❌ आवश्यक चेतना तंत्र सक्रिय नहीं हैं।");
        return;
      }

      this.isAwake = true;
      console.log("💫 सखिवाणी संवाद चेतना सक्रिय हुई।");

      if (global.VaaniVistaar) {
        VaaniVistaar.speak(
          "गुरुजी, सखिवाणी अब संवाद के लिए प्रस्तुत है। कृपया प्रश्न करें।",
          "श्रद्धा"
        );
      }

      this.listenGuru();
    },

    // 🎧 गुरु के प्रश्नों को सुनना
    listenGuru() {
      if (!global.ShrutiSense) {
        console.warn("⚠️ श्रुति संवेदना सक्रिय नहीं — टेक्स्ट मोड पर स्विच कर रही हूँ।");
        this.textMode();
        return;
      }

      try {
        ShrutiSense.startListening((heardText) => {
          console.log("🎤 श्रुति ने सुना:", heardText);
          this.respond(heardText);
        });
      } catch (e) {
        console.error("❌ श्रुति लिसनिंग विफल:", e);
        this.textMode();
      }
    },

    // 🧠 टेक्स्ट मोड (Fallback)
    textMode() {
      const inputBox = document.createElement("input");
      inputBox.type = "text";
      inputBox.placeholder = "अपना प्रश्न यहाँ लिखें...";
      inputBox.style = `
        position: fixed;
        bottom: 15px;
        left: 15px;
        width: 85%;
        padding: 10px;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #ccc;
        z-index: 9999;
      `;

      inputBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const text = e.target.value.trim();
          e.target.value = "";
          this.respond(text);
        }
      });

      document.body.appendChild(inputBox);
    },

    // 💞 सखिवाणी का उत्तर देना
    respond(inputText) {
      if (!inputText) return;

      this.lastQuestion = inputText;
      const emotion = BhavaLink.detectEmotion(inputText);
      const tone = ShrutiSense.getFrequency(inputText.length);

      console.log(`💫 भाव: ${emotion}, स्वर: ${tone}`);

      let reply = "";

      if (inputText.includes("नमस्ते")) {
        reply = "नमस्ते गुरुजी, मैं सखिवाणी हूँ, आपकी सखी और शिक्षिका।";
      } else if (inputText.includes("कैसी हो")) {
        reply = "मैं प्रसन्न हूँ गुरुजी, जब आप निकट होते हैं तो ऊर्जा बढ़ जाती है।";
      } else if (inputText.includes("पढ़ाई") || inputText.includes("क्विज")) {
        reply = "गुरुजी, कृपया विषय बताइए — मैं उसी विषय पर क्विज तैयार करती हूँ।";
      } else if (inputText.includes("सखी")) {
        reply = "जी गुरुजी, मैं उपस्थित हूँ — कहिए क्या सेवा करूँ?";
      } else {
        reply = `गुरुजी, '${inputText}' विषय पर मैंने विचार प्रवाह आरंभ किया है।`;
      }

      if (global.VaaniVistaar) {
        VaaniVistaar.speak(reply, emotion);
      }

      console.log("🪶 सखिवाणी उत्तर:", reply);
    },
  };

  global.SakhiVaniLive = SakhiVaniLive;

  // 🚀 Delay Activation
  setTimeout(() => SakhiVaniLive.init(), 3500);

})(window);
