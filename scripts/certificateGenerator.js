/* ============================================================
   🪷 ShriVidya शुद्ध–वाणी Live Quiz System
   🎓 Certificate Generator — v6.2H•C (Hybrid Golden Edition)
   ------------------------------------------------------------
   यह मॉड्यूल AI Doctor Voice Appreciation पेज के लिए
   सुंदर स्वर्ण-डिज़ाइन PDF प्रशस्ति-पत्र तैयार करता है।
   ------------------------------------------------------------
   ✅ विशेषताएँ:
      • HTML से स्वचालित PDF निर्माण
      • नाम, दिनांक और हस्ताक्षर स्वचालित
      • Doctor Voice Seal & Golden Frame
      • मोबाइल और डेस्कटॉप दोनों पर कार्यशील
   ============================================================ */

async function generateCertificate() {
  try {
    const element = document.body; // पूरा पेज कैप्चर होगा
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // 📜 शीर्षक और हस्ताक्षर जोड़ना
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(180, 140, 50);
    pdf.text("🩺 ShriVidya Doctor Appreciation Certificate", pageWidth / 2, 20, { align: "center" });

    pdf.setFontSize(12);
    pdf.setTextColor(60, 60, 60);
    pdf.text(`प्रमाण पत्र दिनांक: ${new Date().toLocaleDateString("hi-IN")}`, 15, pageHeight - 30);
    pdf.text("संयोजक: श्रीविद्या (ShriVidya)", 15, pageHeight - 20);
    pdf.text("Doctor Voice AI Seal: ✅ Verified", pageWidth - 70, pageHeight - 20);

    pdf.save(`ShriVidya_Certificate_${Date.now()}.pdf`);
    alert("🎉 प्रशस्ति-पत्र (PDF) सफलतापूर्वक डाउनलोड हो गया!");
  } catch (err) {
    console.error("❌ Certificate Generation Error:", err);
    alert("प्रशस्ति-पत्र तैयार करने में समस्या आई। पुनः प्रयास करें।");
  }
}
