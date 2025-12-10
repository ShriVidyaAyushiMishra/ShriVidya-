/* ============================================================
   🕉️ loginCore.js (v16.3.5 — Guru+PIN Access Integration Patch)
   ------------------------------------------------------------
   Purpose : Guru Key + PIN द्विस्तरीय लॉगिन संयोजन
   ============================================================ */

(function () {
  console.log("🔐 Guru+PIN Access System Activated...");

  function checkAccess() {
    const guru = localStorage.getItem("guruKeyVerified");
    const pin = localStorage.getItem("pinVerified");

    if (guru === "true" && pin === "true") {
      console.log("✅ द्विस्तरीय सत्यापन पूर्ण — एडमिन पैनल खुल रहा है...");
      if (window.SwarVivek) {
        SwarVivek.speak("गुरुजी, द्विस्तरीय सत्यापन पूर्ण — सखिवाणी तैयार है।", "श्रद्धा");
      }
      window.location.href = "dashboard.html";
    } else {
      console.warn("⚠️ कृपया सुनिश्चित करें: गुरु पासवर्ड और PIN दोनों सत्यापित हैं।");
    }
  }

  // ✅ Auto-check हर 2 सेकंड में
  setInterval(checkAccess, 2000);
})();

// 🌸 Guru Password Verification (Update v16.6.1)
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector("#guruLoginBtn");
  const inputField = document.querySelector("#guruKeyInput");
  const loginStatus = document.querySelector("#loginStatus");

  if (!loginButton) return; // अगर बटन नहीं मिला तो स्क्रिप्ट बंद कर दो

  const GURU_KEY = " "; // यहाँ अपना सही पासवर्ड डालो

  loginButton.addEventListener("click", function () {
    const entered = inputField.value.trim();

    if (!entered) {
      loginStatus.innerHTML = "⚠️ कृपया अपनी गुरु कुंजी दर्ज करें।";
      return;
    }

    function verifyGuruLogin() {
  const enteredKey = document.getElementById("guruKeyInput").value;

  if (enteredKey === GURU_KEY) {
    // ✅ लॉगिन सफल हुआ — अब सत्र याद रखो
    localStorage.setItem("GuruKeyVerified", "true");
    sessionStorage.setItem("GuruKeyVerified", "true");

    alert("✅ गुरुजी सत्यापित — स्वागत है।");
    window.location.href = "dashboard.html"; // डैशबोर्ड पर भेजो
  } 
  else {
    alert("❌ गलत पासवर्ड। कृपया पुनः प्रयास करें।");
  }
       
    }
  });
});
// 🌼 Guru Session Verification System (v16.6.2)
document.addEventListener("DOMContentLoaded", function () {
  // अगर सत्र (session) पहले से सक्रिय है —
  const alreadyVerified = sessionStorage.getItem("guruVerified");

  if (alreadyVerified === "true") {
    console.log("✅ सत्र पहले से सक्रिय है — सीधे डैशबोर्ड पर भेजा जा रहा है।");
    window.location.href = "dashboard.html";
  }
});
