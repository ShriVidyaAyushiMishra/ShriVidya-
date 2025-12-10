/* ============================================================
   🕉️ RootRecovery_v16_6_6a.js 
   ------------------------------------------------------------
   Purpose : जब किसी कारणवश Guru Login असफल हो जाए, 
             तब यह कोड बिना पासवर्ड प्रवेश की अनुमति देता है।
   ============================================================ */

window.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("button[onclick='verifyGuruLogin()']");
  const status = document.getElementById("loginStatus");

  if (loginButton) {
    // 🔧 नया Root Recovery बटन
    const recoveryBtn = document.createElement("button");
    recoveryBtn.textContent = "🕉️ Root Recovery Access";
    recoveryBtn.style.marginLeft = "10px";
    recoveryBtn.style.background = "#c6f1d6";
    recoveryBtn.style.border = "1px solid #4a8b63";
    recoveryBtn.style.cursor = "pointer";

    loginButton.insertAdjacentElement("afterend", recoveryBtn);

    recoveryBtn.addEventListener("click", () => {
      // ⚙️ Root Access Granted
      localStorage.setItem("guruKeyVerified", "true");
      if (status) status.textContent = "✅ Root Recovery मोड सक्रिय — Welcome Guruji!";
      console.log("🕉️ Root Access Granted — Login Bypassed (Recovery Mode)");

      // डैशबोर्ड की ओर भेज दो
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    });
  }
});
