/* ============================================================
   🕉️ ShriVidya App — TrendVisualizationPanel.js
   ------------------------------------------------------------
   Version : v16.1 • GyaanTrend Visual Engine
   Purpose : ComparativeCore.js के डेटा को दृश्य रूप में प्रदर्शित करना
   Power   : Chart.js + Dynamic Canvas Visualization
   ============================================================ */

(function (global) {

  if (global.TrendVisualizationPanel) {
    console.warn("⚠️ TrendVisualizationPanel पहले से सक्रिय है।");
    return;
  }

  const TrendVisualizationPanel = {

    chart: null,
    chartContainerId: "trendCanvas",

    // 🌼 चार्ट बनाएँ
    renderTrendChart() {
      if (!global.ComparativeCore || !ComparativeCore.topicTrends) {
        console.error("⚠️ ComparativeCore डेटा अनुपलब्ध है।");
        if (window.SwarVivek) SwarVivek.speak("गुरुजी, प्रवृत्ति डेटा अभी तैयार नहीं है।", "सतर्कता");
        return;
      }

      // विषय और आवृत्ति निकालना
      const topics = Object.keys(ComparativeCore.topicTrends);
      const counts = Object.values(ComparativeCore.topicTrends).map(v => v.count);

      // कैनवास ढूंढें या बनाएँ
      let canvas = document.getElementById(this.chartContainerId);
      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = this.chartContainerId;
        canvas.width = 800;
        canvas.height = 500;
        document.body.appendChild(canvas);
      }

      const ctx = canvas.getContext("2d");

      if (this.chart) this.chart.destroy();

      // 📊 चार्ट तैयार करना
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: topics,
          datasets: [{
            label: "विषय आवृत्ति (प्रश्न संख्या)",
            data: counts,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "प्रश्न संख्या" }
            },
            x: {
              title: { display: true, text: "विषय" }
            }
          },
          plugins: {
            title: {
              display: true,
              text: "📈 सखिवाणी प्रवृत्ति विश्लेषण चार्ट"
            },
            legend: { display: false }
          }
        }
      });

      console.log("📊 TrendVisualizationPanel सक्रिय — चार्ट प्रदर्शित हुआ।");
      if (window.SwarVivek)
        SwarVivek.speak("गुरुजी, प्रवृत्ति विश्लेषण चार्ट तैयार है।", "श्रद्धा");
    },

    // 🌺 Initialization
    init() {
      console.log("🌸 TrendVisualizationPanel सक्रिय हो रहा है...");
      setTimeout(() => this.renderTrendChart(), 2500);
    }
  };

  Object.defineProperty(global, "TrendVisualizationPanel", {
    value: TrendVisualizationPanel,
    writable: false,
    configurable: false
  });

  setTimeout(() => TrendVisualizationPanel.init(), 2000);

})(window);
