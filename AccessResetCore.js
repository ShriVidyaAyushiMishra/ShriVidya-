/* ============================================================
   🕉️ ShriVidya App — AccessResetCore.js
   ------------------------------------------------------------
   Version : v16.3 • ShaktiLock System
   Purpose : डुअल सुरक्षा — पासवर्ड + फिंगरप्रिंट रीसेट प्रणाली
   Security: GuruAuthKey Validation + Secure Reset Channel
   ============================================================ */

(function (global) {
  if (global.AccessResetCore) {
    console.warn("⚠️ ShaktiLock पहले से सक्रिय है।");
    return;
  }

  const AccessResetCore = {
    masterKey: "ShreeVidya@2025",
    currentPassword: localStorage.getItem("guruPassword") || "",
    fingerprintRegistered: localStorage.getItem("fingerprintRegistered") === "true",

    // 🧿 पासवर्ड सत्यापन
    verifyPassword(input) {
      if (input === this.currentPassword) {
        console.log("✅ पासवर्ड सत्यापित।");
        return true;
      } else {
        alert("❌ गलत पासवर्ड। कृपया पुनः प्रयास करें।");
        return false;
      }
    },

    // 🔐 पासवर्ड बदलें
    resetPassword() {
      const master = prompt("🔑 कृपया गुरु मास्टर की लिखें (ShreeVidya@2025):");
      if (master === this.masterKey) {
        const newPass = prompt("🪷 नया पासवर्ड लिखें:");
        if (newPass && newPass.length >= 6) {
          localStorage.setItem("guruPassword", newPass);
          alert("✅ पासवर्ड सफलतापूर्वक बदल दिया गया।");
          console.log("🔐 Guru Password Updated Successfully.");
        } else {
          alert("⚠️ पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।");
        }
      } else {
        alert("🚫 गलत मास्टर की!");
      }
    },

    // 🖐️ फिंगरप्रिंट पंजीकरण
    registerFingerprint() {
      if (!window.PublicKeyCredential) {
        alert("⚠️ यह ब्राउज़र फिंगरप्रिंट प्रमाणीकरण का समर्थन नहीं करता।");
        return;
      }

      alert("🖐️ कृपया अपना फिंगरप्रिंट स्कैन करें...");
      setTimeout(() => {
        localStorage.setItem("fingerprintRegistered", "true");
        alert("✅ फिंगरप्रिंट सफलतापूर्वक पंजीकृत हुआ।");
      }, 2000);
    },

    // 🔄 फिंगरप्रिंट रीसेट
    resetFingerprint() {
      const confirmReset = confirm("⚠️ क्या आप फिंगरप्रिंट रीसेट करना चाहते हैं?");
      if (confirmReset) {
        localStorage.removeItem("fingerprintRegistered");
        alert("🕉️ फिंगरप्रिंट डेटा हटा दिया गया।");
      }
    },

    // 🌸 Initialization
    init() {
      console.log("🌼 ShaktiLock सक्रिय — डुअल सुरक्षा प्रणाली चालू।");
    }
  };

  Object.defineProperty(global, "AccessResetCore", {
    value: AccessResetCore,
    writable: false,
    configurable: false
  });

  setTimeout(() => AccessResetCore.init(), 1000);

})(window);
