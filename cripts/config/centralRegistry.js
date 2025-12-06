/* ============================================================
   🌸 ShriVidya App — Central Dynamic Registry
   ------------------------------------------------------------
   Version : v9.9 • Dynamic Auto-Link Edition
   Purpose : यह फाइल ऐप की सभी केंद्रीय जानकारियों को नियंत्रित करती है,
             और सखा व सिक्योरिटी सिस्टम को स्वचालित रूप से जोड़ती है।
   Security : 3-Level Cross Verification + Auto-Sync + Guru Signature
   ============================================================ */

(function (global) {
  // 1️⃣ Initialization Guard
  if (global.SVRegistry && global.SVRegistry.version === "9.9•Dynamic") {
    console.warn("⚠️ SVRegistry पहले से सक्रिय है।");
    return;
  }

  // 2️⃣ केंद्रीय रजिस्ट्री (Dynamic Core)
  const registry = {
    // 🌼 ईमेल रजिस्ट्री — Auto Load from Previous Registry
    adminEmail:
      global.SVRegistry?.adminEmail || "shreevidyamatabhuvanesvari@gmail.com",
    backupEmail:
      global.SVRegistry?.backupEmail || "shrividya8565@gmail.com",
    supportEmail:
      global.SVRegistry?.supportEmail || "shrividya.app@gmail.com",

    // 🪷 सिस्टम पहचान
    systemID: "SV-CORE-SHREEVIDYA",
    registryVersion: "9.9•Dynamic",
    createdBy: "ShriVidya",

    // 🧠 गुरु हस्ताक्षर — Dynamic & Secure
    guruSignature:
      "GURU:" + btoa(global.SVRegistry?.adminEmail || "shreevidya.app@gmail.com"),

    // 🔐 ईमेल आंशिक रूप से छिपाना
    getMaskedEmail() {
      const e = this.adminEmail;
      const [name, domain] = e.split("@");
      return name[0] + "****@" + domain;
    },

    // ⚙️ अखंडता सत्यापन (Integrity Check)
    verifyIntegrity() {
      if (!this.adminEmail.includes("@")) {
        console.error("❌ Invalid Email in Registry.");
        return false;
      }
      if (!this.systemID.startsWith("SV-")) {
        console.error("❌ Invalid System Identifier.");
        return false;
      }
      console.log("✅ Central Registry Verification PASSED.");
      return true;
    },

    // 🌐 Auto-Link System (Sakha + Security)
    autoLinkSystems() {
      setTimeout(() => {
        try {
          if (global.Sakha && global.ShriVidyaSecurity) {
            console.log("🌺 सखा और सिक्योरिटी दोनों लिंक हो चुके हैं।");
            global.Sakha.GlobalInit?.();
            global.ShriVidyaSecurity.refreshKeys?.();
          } else {
            console.warn(
              "⚠️ सखा या सिक्योरिटी अभी उपलब्ध नहीं हैं, पुनः प्रयास होगा..."
            );
            setTimeout(this.autoLinkSystems.bind(this), 3000);
          }
        } catch (err) {
          console.error("⚠️ Auto-Link Error:", err);
        }
      }, 1000);
    },

    // 🔄 रजिस्ट्री प्रारंभ
    init() {
      console.log("🌸 Central Dynamic Registry सक्रिय हो रही है...");
      console.log("📧 Admin Email:", this.getMaskedEmail());
      this.verifyIntegrity();
      this.autoLinkSystems();
    },
  };

  // 🛡️ Global Binding
  Object.defineProperty(global, "SVRegistry", {
    value: registry,
    writable: false,
    configurable: false,
  });

  // 🚀 सक्रियण
  registry.init();
})(window);
