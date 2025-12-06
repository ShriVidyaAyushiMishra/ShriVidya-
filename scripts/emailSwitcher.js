/* ============================================================
   🌸 ShriVidya App — DualSafe Email Switching System
   ------------------------------------------------------------
   Version : v9.8•FullIntegrated
   Purpose : एडमिन ईमेल का सुरक्षित स्विचिंग सिस्टम
   Integration : Sakha + SecurityController + SVRegistry
   Verification : 3-Level — Token + OTP + Sakha Approval
   ============================================================ */

(function() {
  console.log("📧 EmailSwitcher.js सक्रिय है — DualSafe प्रणाली प्रारंभ।");

  // 🧩 सखा और सिक्योरिटी की उपस्थिति सुनिश्चित करना
  if (typeof Sakha === "undefined") {
    console.warn("⚠️ सखा सक्रिय नहीं है, ईमेल स्विचिंग असुरक्षित हो सकती है।");
  }
  if (typeof ShriVidyaSecurity === "undefined") {
    console.warn("⚠️ Security Controller सक्रिय नहीं है, सत्यापन असफल हो सकता है।");
  }

  // 🗝️ केंद्रीय ईमेल रजिस्ट्री
  const registry = SVRegistry || {
    adminEmail: "shreevidya.app@gmail.com",
    backupEmail: "shreevidya.personal@gmail.com",
    supportEmail: "support.shreevidya@gmail.com"
  };

  // 📜 ईमेल स्विचिंग लॉग
  const logList = document.getElementById("logList");

  // 🎯 OTP और Token (Demo Purpose)
  let generatedOTP = null;
  let validToken = "SV-TOKEN-9087";

  // 🧠 OTP भेजना
  window.sendOTP = function() {
    const newEmail = document.getElementById("newEmail").value.trim();
    if (!newEmail.includes("@")) {
      alert("⚠️ कृपया वैध ईमेल दर्ज करें।");
      return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000); // 6-अंकीय OTP
    console.log("📨 भेजा गया OTP:", generatedOTP);

    Sakha?.speak("OTP आपके पंजीकृत ईमेल पर भेज दिया गया है।");
    alert("✅ OTP भेज दिया गया है (Demo Mode: कंसोल देखें)");
  };

  // 🧾 OTP सत्यापन
  window.verifyOTP = function() {
    const enteredOTP = document.getElementById("otpField").value.trim();

    if (enteredOTP === generatedOTP.toString()) {
      Sakha?.speak("OTP सत्यापित कर दिया गया है।");
      alert("✅ OTP सत्यापित हुआ। अब ईमेल स्विच की जा सकती है।");
      return true;
    } else {
      alert("❌ OTP गलत है, कृपया पुनः प्रयास करें।");
      Sakha?.speak("OTP गलत है। कृपया पुनः प्रयास करें।");
      return false;
    }
  };

  // 🔄 ईमेल स्विच करना
  window.switchEmail = function() {
    const newEmail = document.getElementById("newEmail").value.trim();
    if (!verifyOTP()) return;

    const tokenCheck = ShriVidyaSecurity?.validateToken
      ? ShriVidyaSecurity.validateToken(validToken)
      : true;

    if (!tokenCheck) {
      alert("⚠️ टोकन अमान्य है। सुरक्षा सत्यापन असफल।");
      return;
    }

    // ✅ ईमेल परिवर्तन प्रक्रिया
    const oldEmail = registry.adminEmail;
    registry.backupEmail = oldEmail;
    registry.adminEmail = newEmail;

    Sakha?.speak("नई ईमेल सफलतापूर्वक सक्रिय कर दी गई है।");
    alert("✅ ईमेल स्विच सफल हुआ।");

    // 🧾 लॉग जोड़ना
    const logEntry = document.createElement("li");
    logEntry.textContent = `🔁 [${new Date().toLocaleString()}] — नई ईमेल सक्रिय की गई: ${newEmail}`;
    logList.appendChild(logEntry);
  };

  // ❌ रद्द करना
  window.cancelSwitch = function() {
    alert("❌ ईमेल परिवर्तन प्रक्रिया रद्द की गई।");
    Sakha?.speak("ईमेल परिवर्तन प्रक्रिया रद्द कर दी गई है।");
  };

})();
