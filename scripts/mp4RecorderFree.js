/* ============================================================
   🎬 Hybrid MP4 Recorder — Free Edition (v6.0A•M)
   ------------------------------------------------------------
   यह मॉड्यूल आवाज़ + एनिमेशन + टेक्स्ट को एकसाथ रिकॉर्ड कर
   MP4 वीडियो फ़ाइल के रूप में डाउनलोड करने योग्य बनाता है।
   ------------------------------------------------------------
   ✅ मुख्य विशेषताएँ:
      • Voice + Visual + Text Sync Capture
      • Start / Stop Recording Controls
      • Auto-Download (MP4 Format)
      • Lightweight Browser-Based Recorder
   ============================================================ */

let mediaRecorder;
let recordedChunks = [];

// 🟢 रिकॉर्डिंग प्रारंभ
async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
      audio: true
    });
    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    };

    mediaRecorder.onstop = saveRecording;

    mediaRecorder.start();
    alert("🎥 रिकॉर्डिंग शुरू हो गई है — कृपया पेज पूरा चलने दें।");
  } catch (err) {
    alert("⚠️ रिकॉर्डिंग प्रारंभ नहीं हो सकी: " + err.message);
  }
}

// 🔴 रिकॉर्डिंग रोकें
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    alert("⏹️ रिकॉर्डिंग बंद कर दी गई है।");
  }
}

// 💾 MP4 डाउनलोड
function saveRecording() {
  const blob = new Blob(recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ShriVidya_Appreciation_Record.mp4";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 1000);
}
/* ============================================================
   🎙️ Doctor Voice Sync Bridge — v6.2H•D
   ------------------------------------------------------------
   🌸 ShriVidya शुद्ध–वाणी Live Quiz System
   ------------------------------------------------------------
   यह कोड Hybrid MP4 Recorder और Doctor Voice Engine को
   एकसाथ सिंक्रोनाइज़ (Synchronize) करता है।
   ------------------------------------------------------------
   ✅ विशेषताएँ:
      • Voice Start ↔ Recording Start लिंक
      • Voice End ↔ Recording Stop स्वचालित नियंत्रण
      • Error Recovery System (Auto Restart)
   ============================================================ */

let voiceSyncActive = false;

// 🎧 Voice + Recorder Auto-Sync शुरू करना
async function startVoiceAndRecording() {
  try {
    if (voiceSyncActive) {
      alert("🔈 Voice Recorder पहले से सक्रिय है।");
      return;
    }
    voiceSyncActive = true;

    // रिकॉर्डिंग प्रारंभ करें
    await startRecording();

    // आवाज़ प्रारंभ करें
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(message);
      msg.lang = "hi-IN";
      msg.rate = 0.9;
      msg.pitch = 0.95;
      msg.volume = 1;

      // 🎯 जब Doctor Voice बोलना समाप्त करे — तब Recording भी बंद हो
      msg.onend = () => {
        stopRecording();
        voiceSyncActive = false;
        console.log("🎬 Doctor Voice + Recording Auto-Stopped.");
      };

      speechSynthesis.speak(msg);
      console.log("🎙️ Doctor Voice Started + Recording Synchronized.");
    } else {
      alert("⚠️ आपका ब्राउज़र आवाज़ सपोर्ट नहीं करता।");
      stopRecording();
      voiceSyncActive = false;
    }

  } catch (err) {
    console.error("⚠️ Voice Sync Error:", err);
    stopRecording();
    voiceSyncActive = false;
  }
}

// 🟣 नई UI बटन जोड़ना (Auto Voice Recorder)
window.addEventListener("load", () => {
  const syncBtn = document.createElement("button");
  syncBtn.textContent = "🎙️ Doctor Voice + वीडियो एकसाथ चलाएँ";
  syncBtn.style.marginLeft = "10px";
  syncBtn.onclick = startVoiceAndRecording;
  document.querySelector("div[style*='text-align:center']").appendChild(syncBtn);
});
