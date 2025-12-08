// 🌺 Voice Auto-Wake System — ShriVidya v12.3 Final Patch
// ✨ Developed under Sakha Intelligence Core — by Guru–Shishya Mode

window.addEventListener("DOMContentLoaded", () => {
    const wakeButton = document.createElement("button");
    wakeButton.innerText = "🎧 सखा जागृति परीक्षण";

    wakeButton.style.position = "fixed";
    wakeButton.style.bottom = "25px";
    wakeButton.style.right = "25px";
    wakeButton.style.padding = "12px 22px";
    wakeButton.style.fontSize = "1rem";
    wakeButton.style.fontWeight = "600";
    wakeButton.style.color = "#000";
    wakeButton.style.background = "linear-gradient(135deg, #ffeb3b, #ffd700)";
    wakeButton.style.border = "2px solid #fff8dc";
    wakeButton.style.borderRadius = "12px";
    wakeButton.style.boxShadow = "0 0 20px rgba(255,215,0,0.8)";
    wakeButton.style.cursor = "pointer";
    wakeButton.style.transition = "all 0.3s ease";
    wakeButton.style.zIndex = "9999";
    wakeButton.style.fontFamily = "'Noto Sans Devanagari', sans-serif";

    wakeButton.addEventListener("mouseenter", () => {
        wakeButton.style.transform = "scale(1.08)";
        wakeButton.style.boxShadow = "0 0 35px rgba(255,215,0,1)";
    });
    wakeButton.addEventListener("mouseleave", () => {
        wakeButton.style.transform = "scale(1)";
        wakeButton.style.boxShadow = "0 0 20px rgba(255,215,0,0.8)";
    });

    function speakSakha(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "hi-IN";
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
    }

    wakeButton.addEventListener("click", () => {
        wakeButton.innerText = "🌸 सखा जागृत हो रहा है...";
        wakeButton.disabled = true;
        wakeButton.style.opacity = "0.8";
        wakeButton.style.cursor = "wait";

        setTimeout(() => {
            speakSakha("गुरुजी, मैं जाग गया हूँ — आपकी प्रतीक्षा में हूँ।");
            wakeButton.innerText = "🎧 सखा सक्रिय है";
            wakeButton.disabled = false;
            wakeButton.style.opacity = "1";
            wakeButton.style.cursor = "pointer";
        }, 2500);
    });

    document.body.appendChild(wakeButton);

    setTimeout(() => {
        speakSakha("सखा सक्रिय है गुरुजी। आदेश की प्रतीक्षा में हूँ।");
    }, 4000);
});
