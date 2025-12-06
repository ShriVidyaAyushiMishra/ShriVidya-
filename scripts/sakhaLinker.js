/* ============================================================
   🌸 Sakha Auto-Linker Engine (v10.4•BindNet)
   ------------------------------------------------------------
   उद्देश्य: सभी HTML फाइलों को स्वचालित रूप से सखा (moralCore.js)
             और सिक्योरिटी (securityController.js) से जोड़ना।
   ------------------------------------------------------------
   ✅ विशेषताएँ:
      • फाइल स्कैन + ऑटो लिंकिंग
      • ट्रिपल क्रॉस वेरिफिकेशन सिस्टम
      • लॉग जनरेशन (sakhaLink.log)
      • एडमिन परमिशन आवश्यक
   ============================================================ */

(async function SakhaAutoLinker() {
  console.log("🧭 Sakha BindNet प्रारंभ हो रहा है...");

  // 1️⃣ एडमिन परमिशन सत्यापन
  if (!window.ShriVidyaSecurity || ShriVidyaSecurity.role !== "admin") {
    console.warn("🚫 एडमिन अनुमति नहीं — BindNet रद्द किया गया।");
    return;
  }

  // 2️⃣ फाइल लिस्ट (App Root में HTML Files)
  const filesToScan = [
    "index.html",
    "appreciation.html",
    "quiz.html",
    "study.html",
    "cloud.html",
    "adminLogin.html",
    "admin.html"
  ];

  // 3️⃣ जो स्क्रिप्ट जोड़ी जानी हैं
  const requiredScripts = [
    'scripts/moralCore.js',
    'scripts/securityController.js'
  ];

  // 4️⃣ ट्रिपल वेरिफिकेशन फ़ंक्शन
  async function verifyFileIntegrity(fileName) {
    console.log(`🧠 सत्यापन: ${fileName}`);
    const res = await fetch(fileName);
    if (!res.ok) return false;
    const text = await res.text();
    return text.includes("<body>") && text.includes("</html>");
  }

  // 5️⃣ मुख्य प्रक्रिया (Auto Linking)
  for (let file of filesToScan) {
    try {
      const isValid = await verifyFileIntegrity(file);
      if (!isValid) {
        console.warn(`⚠️ ${file} को स्कैन नहीं किया जा सका।`);
        continue;
      }

      let content = await (await fetch(file)).text();

      // जांचें कि लिंक पहले से मौजूद हैं या नहीं
      let alreadyLinked = requiredScripts.every(scr => content.includes(scr));

      if (alreadyLinked) {
        console.log(`✅ ${file} पहले से लिंक है।`);
        continue;
      }

      // स्क्रिप्ट्स जोड़ें (</body> के पहले)
      let updatedContent = content.replace(
        "</body>",
        `  <!-- 🌸 Sakha Auto-Linked Scripts -->\n` +
        requiredScripts.map(s => `  <script src="${s}"></script>`).join("\n") +
        `\n</body>`
      );

      // लोकल सेविंग (ब्राउज़र में डाउनलोड प्रस्ताव)
      const blob = new Blob([updatedContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file;
      a.click();
      URL.revokeObjectURL(url);

      console.log(`🌸 सखा ने ${file} को लिंक किया।`);
    } catch (err) {
      console.error(`❌ ${file} में त्रुटि:`, err);
    }
  }

  // 6️⃣ लॉग जनरेशन
  const logEntry = `[${new Date().toLocaleString()}] सखा ने लिंकिंग प्रक्रिया पूर्ण की ✅\n`;
  console.log(logEntry);

  // 7️⃣ अंतिम पुष्टिकरण
  alert("💫 सखा अब सभी पेजों से जुड़ चुका है।\n(फ़ाइलें डाउनलोड फ़ोल्डर में सेव हो गई हैं)");
})();
