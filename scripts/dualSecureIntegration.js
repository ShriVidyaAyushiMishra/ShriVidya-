/* ============================================================
   🕉️ ShriVidya App — DualSecure Integration Patch
   ------------------------------------------------------------
   Version : v15.6 • Password + Fingerprint Harmony
   Purpose : सखिवाणी में द्विस्तरीय सत्यापन (GuruKey + Fingerprint)
   ============================================================ */

console.log("🛡️ DualSecure Integration सक्रिय...");

(function (global) {
  if (global.DualSecure) {
    console.warn("⚠️ DualSecure पहले से सक्रिय है।");
    return;
  }

  const DualSecure = {
    guruKeyVerified: false,
    fingerprintVerified: false,

    // 🔑 गुरु पासवर्ड की जाँच
    verifyGuruKey() {
      const inputKey = document.getElementById("guruKeyInput")?.value?.trim();
      const storedKey = "OmShreeVidya@2025"; // ← तुम्हारा वास्तविक गुरु पासवर्ड यहाँ डालो

      if (inputKey === storedKey) {
        this.guruKeyVerified = true;
        console.log("✅ Guru Key सत्यापित।");

        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, आपका पासवर्ड सत्यापित हुआ। कृपया फिंगरप्रिंट दें।", "श्रद्धा");
      } else {
        console.warn("❌ गलत गुरु कुंजी।");
        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, यह पासवर्ड मान्य नहीं है।", "सतर्कता");
      }
    },

    // 🔐 फिंगरप्रिंट सत्यापन
    async verifyFingerprint() {
      if (!window.FingerprintAuth) {
        alert("⚠️ FingerprintAuth.js लोड नहीं हुआ।");
        return;
      }

      try {
        await FingerprintAuth.startAuth();
        this.fingerprintVerified = true;
        this.finalVerification();
      } catch (err) {
        console.error("❌ फिंगरप्रिंट असफल:", err);
      }
    },

    // 💫 अंतिम सत्यापन
    finalVerification() {
      if (this.guruKeyVerified && this.fingerprintVerified) {
        console.log("🌺 द्विस्तरीय सत्यापन पूर्ण!");
        if (window.SwarVivek)
          SwarVivek.speak("गुरुजी, दोनों पहचानें सफलतापूर्वक सत्यापित हुईं। आपका स्वागत है।", "आनंद");

        setTimeout(() => {
          window.location.href = "Dashboard.html";
        }, 1500);
      } else {
        console.warn("⚠️ कृपया दोनों पहचानें सत्यापित करें।");
      }
    }
  };

  global.DualSecure = DualSecure;
})(window);
