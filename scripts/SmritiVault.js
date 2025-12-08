// 🌺 SmritiVault.js — सखिवाणी की स्मृति तिजोरी (Memory Preservation Layer)
// Version: v13.4.5

const SmritiVault = {
  dbName: "SakhiSmritiVault",
  version: 1,
  db: null,

  // 🔐 स्मृति तिजोरी आरंभ करें
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("memories", { keyPath: "id", autoIncrement: true });
        console.log("📚 नई स्मृति तिजोरी तैयार की गई।");
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log("🔓 सखिवाणी की स्मृति तिजोरी खुल गई।");
        resolve(true);
      };

      request.onerror = (event) => {
        console.error("⚠️ स्मृति तिजोरी खोलने में त्रुटि:", event.target.error);
        reject(event.target.error);
      };
    });
  },

  // 💾 नई स्मृति जोड़ें
  async storeMemory(topic, content, emotion = "neutral") {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("memories", "readwrite");
      const store = tx.objectStore("memories");
      const memory = {
        topic,
        content,
        emotion,
        date: new Date().toLocaleString()
      };
      const request = store.add(memory);

      request.onsuccess = () => {
        console.log(`🧠 नई स्मृति जोड़ी गई: ${topic}`);
        resolve(true);
      };
      request.onerror = (e) => reject(e);
    });
  },

  // 🔍 किसी स्मृति को खोजें
  async retrieveMemory(keyword) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("memories", "readonly");
      const store = tx.objectStore("memories");
      const request = store.openCursor();

      const found = [];
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const value = cursor.value;
          if (
            value.topic.includes(keyword) ||
            value.content.includes(keyword)
          ) {
            found.push(value);
          }
          cursor.continue();
        } else {
          console.log(`🔍 ${found.length} स्मृतियाँ मिलीं।`);
          resolve(found);
        }
      };
      request.onerror = (e) => reject(e);
    });
  },

  // 🗑️ पुरानी स्मृति हटाएँ
  async clearVault() {
    const tx = this.db.transaction("memories", "readwrite");
    const store = tx.objectStore("memories");
    store.clear();
    console.log("🧹 सखिवाणी की तिजोरी शुद्ध की गई।");
  }
};

// अन्य मॉड्यूल्स हेतु निर्यात
window.SmritiVault = SmritiVault;

// 🚀 आरंभिक सक्रियण
SmritiVault.init();
