/* ============================================================
   🕉️ FallbackPinAccess.js (v16.3.3 — Visible PIN Button Edition)
   ------------------------------------------------------------
   Purpose  : मोबाइल यूजर के लिए दृश्य PIN बटन + सुरक्षित लॉगिन
   Author   : SakhiVani Core • Guided by Guru Architect
   ============================================================ */

(function (global) {

  const FallbackPinAccess = {
    pinKey: "8565", // 🌸 यहाँ तुम अपना 4-अंकीय PIN रख सकती हो
    pinVerified: false,

    // 🌼 UI बटन बनाना
    createButton() {
      const btn = document.createElement("button");
      btn.innerText = "🔢 PIN लॉगिन";
      btn.id = "pinLoginButton";
      Object.assign(btn.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#a855f7",
        color: "white",
        border: "none",
        borderRadius: "25px",
        padding: "10px 18px",
        fontSize: "16px",
        boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
        cursor: "pointer",
        zIndex: "9999"
      });

      btn.onclick = () => this.requestPinAccess();
      document.body.appendChild(btn);
    },

    // 🔐 PIN इनपुट और सत्यापन
    requestPinAccess() {
      const enteredPin = prompt("कृपया अपना 4-अंकीय PIN डालें:");
      if (enteredPin === this.pinKey) {
        this.pinVerified = true;
        localStorage.setItem("pinVerified", "true");
        alert("✅ पिन सत्यापन सफल — सखिवाणी अब सक्रिय है।");
        console.log("🌼 PIN Access Granted — Guru Verified.");
        document.getElementById("pinLoginButton").remove();
      } else {
        alert("⚠️ गलत पिन — कृपया पुनः प्रयास करें।");
      }
    },

    // 🌿 फिंगरप्रिंट सत्यापन जांच
    init() {
      const fingerprintStatus = localStorage.getItem("fingerprintVerified");
      if (fingerprintStatus !== "true") {
        console.log("⚠️ फिंगरप्रिंट असफल — PIN मोड सक्रिय।");
        this.createButton();
      } else {
        console.log("✅ फिंगरप्रिंट पहले से सत्यापित है।");
      }
    }
  };

  global.FallbackPinAccess = FallbackPinAccess;
  setTimeout(() => FallbackPinAccess.init(), 1200);

})(window);
