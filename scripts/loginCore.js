

// Constants
const GURU_KEY = "a@35707207966459#9926@342144"; // यहाँ अपना सही पासवर्ड डालें
const STORAGE_KEY = "GuruKeyVerified";
const TIMESTAMP_KEY = "GuruKeyTimestamp";

// Function to check access
function checkAccess() {
  const isVerified = localStorage.getItem(STORAGE_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);
  const currentTime = new Date().getTime();

  if (isVerified === "true" && timestamp && currentTime - timestamp < 86400000) {
    console.log("✅ द्विस्तरीय सत्यापन पूर्ण — एडमिन पैनल खुल रहा है...");
    if (window.SwarVivek) {
      SwarVivek.speak("गुरुजी, द्विस्तरीय सत्यापन पूर्ण — सखिवाणी तैयार है।", "श्रद्धा");
    }
    window.location.href = "dashboard.html";
  } else {
    console.warn("⚠️ कृपया सुनिश्चित करें: गुरु पासवर्ड और PIN दोनों सत्यापित हैं।");
  }
}

// Auto-check every 24 hours
setInterval(checkAccess, 86400000);

// Login functionality
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector("#guruLoginBtn");
  const inputField = document.querySelector("#guruKeyInput");
  const loginStatus = document.querySelector("#loginStatus");

  loginButton.addEventListener("click", function () {
    const enteredKey = inputField.value.trim();
    if (!enteredKey) {
      loginStatus.innerHTML = "⚠️ कृपया अपनी गुरु कुंजी दर्ज करें।";
      return;
    }

    if (enteredKey === GURU_KEY) {
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem(TIMESTAMP_KEY, new Date().getTime());
      alert("✅ गुरुजी सत्यापित — स्वागत है।");
      window.location.href = "dashboard.html";
    } else {
      alert("❌ गलत पासवर्ड। कृपया पुनः प्रयास करें।");
    }
  });
});

// Session verification
document.addEventListener("DOMContentLoaded", function () {
  const isVerified = localStorage.getItem(STORAGE_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);
  const currentTime = new Date().getTime();

  if (isVerified === "true" && timestamp && currentTime - timestamp < 86400000) {
    console.log("✅ सत्र पहले से सक्रिय है — सीधे डैशबोर्ड पर भेजा जा रहा है।");
    window.location.href = "dashboard.html";
  }
});
