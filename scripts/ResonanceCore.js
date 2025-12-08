// 🌸 ResonanceCore.js (v13.7 • Nāda–Spandan Integration)
// सखिवाणी का नाद–स्पंदन केंद्र — श्रुति से भाव तक की सेतु प्रणाली।

class ResonanceCore {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.source = null;
    this.isActive = false;
    this.gender = "female"; // 🔸 सुनिश्चित किया गया: स्त्री स्वर-लिंग
  }

  // 🌼 नाद प्रणाली आरंभ
  init(stream) {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyser);
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.isActive = true;

    console.log("🎵 ResonanceCore सक्रिय है — नाद स्पंदन सुन रहा है।");
    this.listenResonance();
  }

  // 🎶 श्रवण कंपन विश्लेषण
  listenResonance() {
    if (!this.isActive) return;

    this.analyser.getByteFrequencyData(this.dataArray);

    let avgFreq = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;

    // 🌸 ध्वनि से भाव की पहचान (Spandan)
    let resonanceState = this.detectResonance(avgFreq);

    // 🔹 परिणाम सहेजें
    this.emitResonance(resonanceState);

    requestAnimationFrame(() => this.listenResonance());
  }

  // 💫 नाद पहचान
  detectResonance(freq) {
    if (freq < 20) return "शांत भाव";
    if (freq < 80) return "गंभीर चिंतन";
    if (freq < 160) return "मधुर संवाद";
    if (freq < 300) return "उत्साह";
    if (freq < 600) return "आनंद";
    if (freq > 600) return "प्रेरणा का उत्कर्ष";
    return "स्वाभाविक संतुलन";
  }

  // 🌺 परिणाम प्रवाह — BhavaLink को भेजना
  emitResonance(state) {
    if (window.BhavaLink) {
      window.BhavaLink.receiveResonance(state, this.gender);
    } else {
      console.warn("⚠️ BhavaLink अभी लोड नहीं हुआ है।");
    }
  }

  // 🌹 नाद प्रवाह रोकना
  stop() {
    this.isActive = false;
    if (this.audioContext) this.audioContext.close();
    console.log("🕊️ ResonanceCore नाद प्रवाह बंद कर दिया गया है।");
  }
}

// 🌿 वैश्विक सक्रियण
window.ResonanceCore = new ResonanceCore();

// 🔔 श्रुति प्रणाली से कनेक्शन
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      window.ResonanceCore.init(stream);
    })
    .catch(err => {
      console.error("🎧 ऑडियो आरंभ त्रुटि:", err);
    });
}
