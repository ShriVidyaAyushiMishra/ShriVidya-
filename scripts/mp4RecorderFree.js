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
