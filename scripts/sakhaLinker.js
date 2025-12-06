/* ============================================================
   🌸 ShriVidya App — Sakha Auto-Bind Engine
   ------------------------------------------------------------
   Version : v10.4•BindNet
   Purpose : सखा और सिक्योरिटी को हर HTML फाइल में स्वतः सक्रिय करना।
   System  : Moral Intelligence + SecurityController + Registry Sync
   Security: Triple-Layer Validation + Silent Recovery Mode
   ============================================================ */

(function () {
  console.log("🔗 Sakha Auto-Bind Engine प्रारंभ हो रहा है...");

  // 1️⃣ प्रीलोड चेक
  if (typeof window.Sakha === "undefined") {
    console.warn("⚠️ सखा अभी लोड नहीं हुआ, moralCore.js आवश्यक है।");
    return;
  }
  if (typeof window.ShriVidyaSecurity === "undefined") {
    console.warn("⚠️ Security Controller अनुपस्थित, securityController.js आवश्यक है।");
    return;
  }

  // 2️⃣ पेज पहचान
  const currentPage = window.location.pathname.split("/").pop();
  console.log(`📄 Auto-Binding सक्रिय: ${currentPage}`);

  // 3️⃣ सखा आरंभ
  try {
    Sakha.GlobalInit();
    Sakha.linkModule(currentPage);
    Sakha.speak(`नमस्ते श्रीविद्या जी, सखा ${currentPage} पेज से जुड़ गया है।`);
    console.log(`✅ सखा अब ${currentPage} से लिंक्ड है।`);
  } catch (err) {
    console.error("❌ सखा इनिशियलाइज़ेशन असफल:", err);
  }

  // 4️⃣ सिक्योरिटी सक्रियण
  try {
    if (window.ShriVidyaSecurity) {
      ShriVidyaSecurity.autoSession();
      console.log("🛡️ Security Controller सक्रिय है।");
    }
  } catch (err) {
    console.error("⚠️ Security Auto-Bind Error:", err);
  }

  // 5️⃣ हेल्थ-मॉनिटर
  setInterval(() => {
    if (!Sakha.sessionActive()) {
      console.warn("⏸️ सखा सेशन निष्क्रिय, पुनः प्रयास जारी...");
      Sakha.recoverSession();
    }
  }, 240000); // हर 4 मिनट में स्थिति जांच

  // 6️⃣ यूनिवर्सल हैंडलिंग
  window.addEventListener("beforeunload", () => {
    Sakha.logEvent("sessionEnd", currentPage);
  });

  console.log("💫 Sakha Auto-Bind Engine पूर्ण सक्रिय हुआ।");
})();
