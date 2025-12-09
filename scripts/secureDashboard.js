/* ============================================================
   🕉️ ShriVidya App — Secure Dashboard Protection System
   ------------------------------------------------------------
   Version : v15.7 • Guru Protected Console
   Purpose : केवल सत्यापित गुरु को Dashboard तक पहुँचने की अनुमति
   Security: Dual Verification Check (Guru Key + Fingerprint)
   ============================================================ */

console.log("🛡️ SecureDashboard सक्रिय...");

(function (global) {
  const SecureDashboard = {
    accessGranted: false,

    // 🧩 सत्यापन स्थिति जाँच
    verifyAccess() {
      try {
        const guruKeyVerified = localStorage.getItem("guruKeyVerified") === "true";
        const fingerprintVerified = localStorage.getItem("fingerprintVerified") === "true";

        if (guruKeyVerified && fingerprintVerified) {
          console.log("✅ द्विस्तरीय सत्यापन सफल — Dashboard अनलॉक।");
          this.accessGranted = true;
          this.showWelcomeMessage();
        } else {
          console.warn("❌ सत्यापन असफल — Dashboard ब्लॉक।");
          this.redirectToLogin();
        }
      } catch (err) {
        console.error("⚠️ Access Verification Error:", err);
        this.redirectToLogin();
      }
    },

    // 🌺 गुरु स्वागत संदेश
    showWelcomeMessage() {
      if (window.SwarVivek) {
        SwarVivek.speak("गुरुजी, आपका स्वागत है। सखिवाणी आपकी प्रतीक्षा में थी।", "श्रद्धा");
      }
      document.body.style.opacity = "1";
      console.log("🌸 Dashboard पूरी तरह सक्रिय है।");
    },

    // 🚫 असत्यापित उपयोगकर्ता को वापस भेजना
    redirectToLogin() {
      if (window.SwarVivek) {
        SwarVivek.speak("गुरुजी, कृपया पहले अपनी पहचान सत्यापित करें।", "सतर्कता");
      }
      document.body.style.opacity = "0.5";
      setTimeout(() => {
        window.location.href = "admin.html";
      }, 2000);
    }
  };

  global.SecureDashboard = SecureDashboard;
  window.addEventListener("DOMContentLoaded", () => SecureDashboard.verifyAccess());
})(window);
