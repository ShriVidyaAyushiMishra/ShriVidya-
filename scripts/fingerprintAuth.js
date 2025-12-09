/* ============================================================
   🕉️ ShriVidya App — Fingerprint + Password Secure Entry
   ------------------------------------------------------------
   Version : v15.5 • Guru Secure Gate
   Purpose : सखिवाणी में गुरु प्रवेश हेतु फिंगरप्रिंट सत्यापन
   ============================================================ */

console.log("🔐 Fingerprint Authentication System प्रारंभ...");

(function (global) {
  if (global.FingerprintAuth) {
    console.warn("⚠️ FingerprintAuth पहले से सक्रिय है।");
    return;
  }

  const FingerprintAuth = {
    // 🔸 फिंगरप्रिंट उपलब्धता जांचें
    async isSupported() {
      if (!window.PublicKeyCredential) {
        alert("⚠️ आपके डिवाइस पर फिंगरप्रिंट समर्थित नहीं है।");
        return false;
      }
      return true;
    },

    // 🔹 फिंगरप्रिंट सत्यापन प्रारंभ
    async startAuth() {
      const supported = await this.isSupported();
      if (!supported) return;

      try {
        const cred = await navigator.credentials.get({
          publicKey: {
            challenge: new Uint8Array(32),
            allowCredentials: [],
            timeout: 60000,
            userVerification: "required"
          }
        });

        console.log("✅ फिंगरप्रिंट सफलतापूर्वक सत्यापित हुआ।");
        this.onSuccess();

      } catch (err) {
        console.error("❌ फिंगरप्रिंट सत्यापन असफल:", err);
        if (window.SwarVivek) {
          SwarVivek.speak("गुरुजी, फिंगरप्रिंट सत्यापन असफल रहा।", "सतर्कता");
        }
      }
    },

    // 🌸 सत्यापन सफल होने पर
    onSuccess() {
      if (window.SwarVivek) {
        SwarVivek.speak("गुरुजी, आपकी पहचान सफलतापूर्वक सत्यापित हुई।", "श्रद्धा");
      }

      const loginPanel = document.getElementById("adminLoginPanel");
      if (loginPanel) loginPanel.style.display = "none";

      setTimeout(() => {
        window.location.href = "Dashboard.html";
      }, 1000);
    }
  };

  global.FingerprintAuth = FingerprintAuth;
})(window);
