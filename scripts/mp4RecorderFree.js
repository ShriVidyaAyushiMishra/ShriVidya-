/* ============================================================
   🎬 Hybrid MP4 Recorder Engine — v6.1H•FREE
   ------------------------------------------------------------
   🌸 ShriVidya शुद्ध–वाणी Live Quiz System
   ------------------------------------------------------------
   यह बेस इंजन "प्रशस्ति-पत्र पेज" की स्क्रीन और आवाज़ को
   एक साथ रिकॉर्ड करने की सुविधा देता है — बिना किसी paid API के।
   ------------------------------------------------------------
   ✅ विशेषताएँ:
      • स्क्रीन + आवाज़ का समेकित रिकॉर्डिंग (MediaRecorder)
      • आवाज़ TTS से सीधे कैप्चर
      • फ्री, सर्वरलेस और ब्राउज़र में चलने योग्य
      • Stop → Save (WebM) प्रक्रिया
   ============================================================ */

let mediaRecorder;
let recordedChunks = [];
let audioStream;
let screenStream;
let mixedStream;
let isRecording = false;

// 🌐 आवाज़ और स्क्रीन दोनों स्रोत कैप्चर करें
async function startRecording() {
  try {
    if (isRecording) {
      alert("🔴 रिकॉर्डिंग पहले से चालू है।");
      return;
    }

    // 🖥️ स्क्रीन कैप्चर
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
      audio: false,
    });

    // 🎤 आवाज़ (TTS Output सहित)
    audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    // दोनों को जोड़ना (mix करना)
    mixedStream = new MediaStream([
      ...screenStream.getVideoTracks(),
      ...audioStream.getAudioTracks(),
    ]);

    // 🎥 MediaRecorder सेटअप
    mediaRecorder = new MediaRecorder(mixedStream, {
      mimeType: "video/webm; codecs=vp9,opus",
    });

    // डेटा संग्रह
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    };

    // जब रिकॉर्डिंग पूरी हो
    mediaRecorder.onstop = saveRecording;

    // रिकॉर्डिंग शुरू
    mediaRecorder.start();
    isRecording = true;
    alert("🎙️ रिकॉर्डिंग शुरू हो गई है...");

  } catch (err) {
    console.error("⚠️ Recording Error:", err);
    alert("रिकॉर्डिंग प्रारंभ नहीं हो सकी। कृपया अनुमति दें।");
  }
}

// 🔴 रिकॉर्डिंग बंद करें
function stopRecording() {
  if (!isRecording) {
    alert("⚠️ कोई रिकॉर्डिंग चालू नहीं है।");
    return;
  }
  mediaRecorder.stop();
  screenStream.getTracks().forEach(track => track.stop());
  audioStream.getTracks().forEach(track => track.stop());
  isRecording = false;
  alert("🟡 रिकॉर्डिंग बंद हो गई। अब वीडियो सेव होगा...");
}

// 💾 वीडियो सेव करें (WebM फॉर्मेट)
function saveRecording() {
  const blob = new Blob(recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ShriVidya_Appreciation_${Date.now()}.webm`;
  a.click();
  URL.revokeObjectURL(url);
  recordedChunks = [];
  alert("✅ वीडियो सेव हो गया (WebM फाइल के रूप में)।");
}
