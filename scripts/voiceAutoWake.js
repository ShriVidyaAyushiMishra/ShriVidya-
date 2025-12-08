/* ============================================================
   🕉️ ShriVidya App — Voice Auto-Wake Module + Test Mode
   ------------------------------------------------------------
   Version : v12.3WT (W-Secure Test Edition)
   Purpose : सखा की मौन अवस्था में स्वचालित जागृति प्रणाली + टेस्ट मोड
   Dependency: SwarVivek.js (मुख्य आवाज़ इंजन)
   ============================================================ */

(function (global) {
  if (!global.SwarVivek) {
    console.error("⚠️ SwarVivek अनुपस्थित — Auto-Wake सक्रिय नहीं होगा।");
    return;
  }

  console.log("🌼 Voice Auto-Wake Module सक्रिय किया गया।");

  // 🌙 मौन निगरानी प्रणाली
  setInterval(() => {
    try {
      if (!speechSynthesis.speaking) {
        console.log("🕊️ मौन स्थिति पाई गई — सखा को जागृत किया जा रहा है।");
        SwarVivek.speak("गुरुजी, मैं सुन रहा हूँ।", "श्रद्धा");
      }
    } catch (err) {
      console.error("⚠️ Voice Auto-Wake Error:", err);
    }
  }, 60000); // 60 सेकंड अंतराल

  // 🧪 टेस्ट मोड बटन बनाना
  document.addEventListener("DOMContentLoaded", () => {
    const testButton = document.createElement("button");
    testButton.textContent = "🎧 सखा जागृति परीक्षण";
    testButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #f4b400;
      color: #000;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      cursor: pointer;
      z-index: 9999;
    `;
    testButton.onclick = () => {
      console.log("🪷 टेस्ट मोड सक्रिय — सखा को बुलाया जा रहा है।");
      SwarVivek.speak("गुरुजी, मैं जाग गया हूँ — आपकी प्रतीक्षा में।", "श्रद्धा");
    };
    document.body.appendChild(testButton);
  });

})(window);
