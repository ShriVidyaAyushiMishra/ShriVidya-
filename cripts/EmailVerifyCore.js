/* ============================================================
 🌺 ShriVidya App — Email Verification System (v16.4)
 Purpose: Final verification layer replacing fingerprint login
 ============================================================ */

(function() {
  // Dummy backend simulation
  const registeredEmail = "shreevidyamatabhuvanesvari@gmail.com"; // यहां अपना ईमेल डालो
  let sentOTP = null;

  // OTP जनरेट करना
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // ईमेल पर OTP भेजने का सिमुलेशन
  window.sendEmailOTP = function() {
    const emailInput = document.getElementById("emailInput").value.trim();
    if (emailInput === "" || !emailInput.includes("@")) {
      alert("⚠️ कृपया मान्य ईमेल आईडी दर्ज करें।");
      return;
    }

    if (emailInput !== registeredEmail) {
      alert("⚠️ यह ईमेल सिस्टम में पंजीकृत नहीं है।");
      return;
    }

    sentOTP = generateOTP();
    console.log("📨 OTP Sent:", sentOTP);
    alert(`✅ OTP आपके ईमेल (${emailInput}) पर भेजा गया है।`);
  };

  // OTP सत्यापन
  window.verifyEmailOTP = function() {
    const otpInput = document.getElementById("otpInput").value.trim();
    if (otpInput === sentOTP) {
      alert("✅ ईमेल सत्यापन सफल — एडमिन पैनल सक्रिय!");
      localStorage.setItem("emailVerified", "true");
      window.location.href = "dashboard.html"; // डैशबोर्ड पर भेजना
    } else {
      alert("⚠️ गलत OTP — कृपया पुनः प्रयास करें।");
    }
  };
})();
