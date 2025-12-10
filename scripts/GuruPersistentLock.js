/* 🌺 GuruPersistentLock.js (v17.0 — Eternal Session Layer)
   उद्देश्य : सखीवाणी गुरु सत्र को स्थायी बनाना
*/

(function() {
  const GURU_KEY = "GuruKeyVerified";
  const SYNC_INTERVAL = 10000; // हर 10 सेकंड में जांच

  // ✅ लॉगिन याद रखने का फंक्शन
  function persistGuruSession() {
    try {
      // अगर कोई एक में है तो दूसरे में कॉपी कर दो
      const local = localStorage.getItem(GURU_KEY);
      const session = sessionStorage.getItem(GURU_KEY);

      if (local === "true" && session !== "true") {
        sessionStorage.setItem(GURU_KEY, "true");
      }
      if (session === "true" && local !== "true") {
        localStorage.setItem(GURU_KEY, "true");
      }

      // Debug
      console.log("🔒 Guru Session Sync Active");
    } catch (e) {
      console.warn("GuruPersistentLock Error:", e);
    }
  }

  // ⏳ निरंतर निगरानी
  setInterval(persistGuruSession, SYNC_INTERVAL);

  // पहली बार चालू होने पर तुरंत कॉल करो
  persistGuruSession();
})();
