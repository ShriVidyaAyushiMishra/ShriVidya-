/* ============================================================
   🕉️ ShriVidya App — VoiceReset.js
   ------------------------------------------------------------
   Version : v15.9 • ShabdaPunarJanm System
   Purpose : गुरु-सत्यापन के बाद सुरक्षित स्वर पुनः पंजीकरण
   Security: Dual Authentication (Password + Fingerprint)
   ============================================================ */

(function (global) {
  if (global.VoiceResetSystem) {
    console.warn("⚠️ VoiceReset पहले से सक्रिय है।");
    return;
  }

  const VoiceResetSystem = {
    // 🌼 स्वर-रीसेट की जाँच — केवल गुरु-सत्यापन के बाद ही उपलब्ध
    checkAccess() {
      const guruAuth = localStorage.getItem("guruKeyVerified") === "true";
      const fingerAuth = localStorage.getItem("fingerprintVerified") === "true";

      if (guruAuth && fingerAuth) {
        this.showVoiceResetButton();
        console.log("✅ Voice Reset: Access Granted.");
      } else {
        console.warn("🚫 Voice Reset: Access Denied — Authentication Required.");
      }
    },

    // 🌺 बटन दिखाओ
    showVoiceResetButton() {
      const section = document.createElement("div");
      section.id = "voiceResetSection";
      section.style.textAlign = "center";
      section.style.marginTop = "40px";

      const heading = document.createElement("h3");
      heading.innerText = "🔄 स्वर पुनः पंजीकरण (Voice Re-Enrollment)";

      const btn = document.createElement("button");
      btn.id = "voiceResetBtn";
      btn.innerText = "🎙️ आवाज़ बदलें";
      btn.style.padding = "10px 20px";
      btn.style.fontSize = "16px";
      btn.style.borderRadius = "8px";
      btn.style.cursor = "pointer";
      btn.style.backgroundColor = "#8BC34A";
      btn.style.color = "#fff";
      btn.style.border = "none";
      btn.style.boxShadow = "0 0 8px rgba(0,0,0,0.3)";

      btn.addEventListener("click", () => this.resetVoice());

      section.appendChild(heading);
      section.appendChild(btn);
      document.body.appendChild(section);
    },

    // 🔐 स्वर रीसेट की प्रक्रिया
    resetVoice() {
      const confirmReset = confirm("क्या आप अपनी पुरानी आवाज़ हटाकर नई पंजीकृत करना चाहते हैं?");
      if (!confirmReset) return;

      // पुरानी आवाज़ हटाएँ
      localStorage.removeItem("guruVoiceSignature");
      console.log("🧹 पुरानी आवाज़ डेटा मिटाया गया।");

      // नई आवाज़ पंजीकरण
      if (window.SwarVivek && SwarVivek.startVoiceEnrollment) {
        SwarVivek.speak("गुरुजी, कृपया अपना पवित्र मंत्र बोलें।", "श्रद्धा");
        setTimeout(() => {
          SwarVivek.startVoiceEnrollment();
          console.log("🎧 नई आवाज़ रिकॉर्डिंग प्रारंभ।");
        }, 1500);
      } else {
        alert("⚠️ Voice System सक्रिय नहीं है — कृपया SwarVivek.js की जाँच करें।");
      }
    }
  };

  global.VoiceResetSystem = VoiceResetSystem;

  // 🌸 Initialization
  window.addEventListener("DOMContentLoaded", () => {
    VoiceResetSystem.checkAccess();
  });

})(window);
