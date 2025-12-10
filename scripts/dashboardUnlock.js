/* ============================================================
   🕉️ ShriVidya App — Dashboard Unlock Portal (v16.2)
   ------------------------------------------------------------
   Purpose : One-Tap Secure Entry to Guru Dashboard
   Security: Dual Auth Validation (Password + Fingerprint)
   ============================================================ */

(function () {
  console.log("🔓 Dashboard Unlock Portal सक्रिय हो रहा है...");

  // 🔑 सत्यापन जांच कार्य
  function verifyDualAuth() {
    const pass = localStorage.getItem("guruKeyVerified");
    const fp = localStorage.getItem("fingerprintVerified");

    if (pass && fp) {
      console.log("✅ गुरुजी सत्यापित — Dashboard Unlocking...");
      if (window.SwarVivek) {
        SwarVivek.speak("गुरुजी, आपका प्रवेश सत्यापित हुआ। डैशबोर्ड खुल रहा है।", "श्रद्धा");
      }
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      console.warn("⚠️ सत्यापन अधूरा — कृपया लॉगिन करें।");
      alert("⚠️ कृपया पहले पासवर्ड और फिंगरप्रिंट से लॉगिन करें।");
      window.location.href = "admin.html";
    }
  }

  // 🎚️ बटन निर्माण
  window.addEventListener("DOMContentLoaded", () => {
    const unlockBtn = document.createElement("button");
    unlockBtn.textContent = "🔓 गुरुजी, डैशबोर्ड खोलें";
    unlockBtn.style.position = "fixed";
    unlockBtn.style.bottom = "25px";
    unlockBtn.style.right = "25px";
    unlockBtn.style.padding = "12px 20px";
    unlockBtn.style.borderRadius = "10px";
    unlockBtn.style.fontSize = "16px";
    unlockBtn.style.fontWeight = "bold";
    unlockBtn.style.background = "linear-gradient(45deg, #ffd966, #ffcc00)";
    unlockBtn.style.color = "#222";
    unlockBtn.style.border = "none";
    unlockBtn.style.cursor = "pointer";
    unlockBtn.style.zIndex = "9999";
    unlockBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";

    unlockBtn.addEventListener("click", verifyDualAuth);

    document.body.appendChild(unlockBtn);
  });
})();
