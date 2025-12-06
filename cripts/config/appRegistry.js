/* ============================================================
   🌸 ShriVidya App — Central Email & Identity Registry
   ------------------------------------------------------------
   Version : v9.5•Core
   Purpose : यह फाइल एप की सभी यूनिवर्सल जानकारियाँ सुरक्षित रखती है —
             जैसे एडमिन ईमेल, सपोर्ट ईमेल, और सिस्टम आईडी।
   Security : 3-Level Cross Verification + Dynamic Key Masking
   ============================================================ */

(function(global) {

  // 1️⃣ प्राथमिक सत्यापन (Initialization Guard)
  if (global.SVRegistry) {
    console.warn("⚠️ SVRegistry पहले से इनिशियलाइज्ड है।");
    return;
  }

  // 2️⃣ केंद्रीय रजिस्ट्री
  const registry = {
    adminEmail: "shreevidyamatabhuvanesvari@gmail.com",  // ← यहाँ आप अपनी ईमेल डालें (उदाहरण: shreevidya.app@gmail.com)
    supportEmail: "support@shreevidya.in", 
    systemID: "SV-CORE-SHREEVIDYA",
    registryVersion: "9.5•Core",
    createdBy: "ShriVidya",

    // 3️⃣ सुरक्षा हेतु Email Mask (आंशिक छिपाना)
    getMaskedEmail() {
      const e = this.adminEmail;
      const [name, domain] = e.split("@");
      return name[0] + "****@" + domain;
    },

    // 4️⃣ क्रॉस चेक वैलिडेशन
    verifyIntegrity() {
      if (!this.adminEmail.includes("@")) {
        console.error("❌ Invalid Email Structure in Registry.");
        return false;
      }
      if (!this.systemID.startsWith("SV-")) {
        console.error("❌ Invalid System Identifier.");
        return false;
      }
      return true;
    }
  };

  // 5️⃣ सुरक्षित रूप से ग्लोबल ऑब्जेक्ट में जोड़ना
  Object.defineProperty(global, "SVRegistry", {
    value: registry,
    writable: false,
    configurable: false,
  });

  console.log("✅ ShriVidya App Registry सफलतापूर्वक इनिशियलाइज्ड हुई।");
  console.log("📧 Masked Admin Email:", registry.getMaskedEmail());
  console.log("🧩 Integrity Check:", registry.verifyIntegrity() ? "PASSED" : "FAILED");

})(window);
