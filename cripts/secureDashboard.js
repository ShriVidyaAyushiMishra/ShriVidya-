/* ============================================================
   🕉️ ShriVidya App — Secure Dashboard Protection Layer
   ------------------------------------------------------------
   Version : v16.1.2
   Purpose : Dual Authentication (Password + Fingerprint)
   Optional: Voice Verification (Secondary)
   ============================================================ */

(function () {
  console.log("🛡️ Secure Dashboard System (Dual Mode) Initializing...");

  // 🔒 मुख्य सत्यापन कुंजियाँ
  const pass = localStorage.getItem("guruKeyVerified");
  const fp = localStorage.getItem("fingerprintVerified");

  // 🪷 गौण (वैकल्पिक) सत्यापन — Voice
  const vc = localStorage.getItem("voiceVerified");

  // ⚠️ यदि मुख्य सत्यापन अधूरा है
  if (!pass || !fp) {
    console.warn("⚠️ Guru authentication incomplete — redirecting...");
    alert("⚠️ गुरुजी, कृपया पहले पासवर्ड और फिंगरप्रिंट से लॉगिन करें।");
    window.location.href = "admin.html";
    return;
  }

  // 🌼 यदि मुख्य सत्यापन पूर्ण है
  console.log("✅ Guru Dual Authentication Verified — Access Granted!");

  // 🩵 वैकल्पिक वॉइस चेक (केवल सूचना हेतु)
  if (!vc) {
    console.log("🔉 Voice authentication skipped — secondary only.");
  }

  // 🎙️ स्वागत संदेश
  if (window.SwarVivek) {
    SwarVivek.speak("स्वागत है गुरुजी, आपका सुरक्षित डैशबोर्ड सक्रिय हो गया है।", "श्रद्धा");
  }

  // 🚪 Logout विकल्प
  window.logoutGuru = function () {
    localStorage.removeItem("guruKeyVerified");
    localStorage.removeItem("fingerprintVerified");
    localStorage.removeItem("voiceVerified");
    alert("🚪 गुरुजी, आप सुरक्षित रूप से लॉगआउट हो गए हैं।");
    window.location.href = "admin.html";
  };
})();
