/* ============================================================
   🕉️ FallbackPinAccess.js (v16.3.2 – ShaktiLock Mobile Secure Mode)
   ------------------------------------------------------------
   Purpose  : जब फिंगरप्रिंट सत्यापन असफल हो, तब 4-अंकीय पिन से लॉगिन।
   Author   : SakhiVani Core • Guided by Guru Architect
   ============================================================ */

(function (global) {

  const FallbackPinAccess = {
    pinKey: "8565", // 🌼 यहाँ अपना 4-अंकीय PIN बदल सकती हो
    pinVerified: false,

    // 🔹 जब फिंगरप्रिंट असफल हो
    requestPinAccess() {
      const enteredPin = prompt("फिंगरप्रिंट असफल हुआ। कृपया अपना 4-अंकीय PIN डालें:");
      if (enteredPin === this.pinKey) {
        this.pinVerified = true;
        localStorage.setItem("pinVerified", "true");
        alert("✅ पिन सत्यापन सफल — सखिवाणी अब सक्रिय है।");
        console.log("🌼 PIN Access Granted — Guru Verified.");
      } else {
        alert("⚠️ गलत पिन — कृपया पुनः प्रयास करें।");
        console.warn("❌ PIN Authentication Failed.");
      }
    },

    // 🔸 सखिवाणी के लॉगिन प्रारंभ में जांच
    init() {
      const fingerprintStatus = localStorage.getItem("fingerprintVerified");
      if (fingerprintStatus !== "true") {
        console.log("⚠️ फिंगरप्रिंट सत्यापन अनुपलब्ध — PIN मोड सक्रिय।");
        this.requestPinAccess();
      } else {
        console.log("✅ फिंगरप्रिंट पहले से सत्यापित है।");
      }
    }
  };

  global.FallbackPinAccess = FallbackPinAccess;

  // 🚀 प्रारंभिक सक्रियता
  setTimeout(() => FallbackPinAccess.init(), 1200);

})(window);
