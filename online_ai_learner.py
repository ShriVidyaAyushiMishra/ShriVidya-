"""
online_ai_learner.py

यह मॉड्यूल एक सरल Online Learning Engine देता है,
जिसे किसी भी AI App में जोड़कर नए डेटा से लगातार सीखने की क्षमता दी जा सकती है।
"""

from typing import List, Tuple, Optional
import time

from sklearn.linear_model import SGDClassifier
from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.pipeline import make_pipeline
import numpy as np


class OnlineTextLearner:
    """
    OnlineTextLearner
    ------------------
    यह क्लास टेक्स्ट-बेस्ड AI मॉडल को online तरीके से train / update करने के लिए है।
    - HashingVectorizer : टेक्स्ट को नंबरों में बदलता है (incremental-friendly)
    - SGDClassifier     : partial_fit के ज़रिए थोड़ा-थोड़ा online train होता है
    """

    def __init__(self, classes: Optional[List[int]] = None):
        # classes = सभी possible लेबल (जैसे [0,1] या [0,1,2])
        if classes is None:
            # डेमो के लिए binary classification मान लेते हैं
            classes = [0, 1]

        self.classes_ = np.array(classes)

        # Pipeline: Vectorizer + Classifier
        self.model = make_pipeline(
            HashingVectorizer(n_features=2**16, alternate_sign=False),
            SGDClassifier(loss="log_loss")
        )

        # Flag: मॉडल पहले init हो चुका है या नहीं
        self._is_initialized = False

    def partial_train(self, texts: List[str], labels: List[int]) -> None:
        """
        नए छोटे batch पर मॉडल को online तरीके से train / update करता है।
        """
        if not texts:
            return

        X = texts
        y = np.array(labels)

        # पहली बार partial_fit में classes देनी होती हैं
        if not self._is_initialized:
            self.model.named_steps["sgdclassifier"].partial_fit(
                self.model.named_steps["hashingvectorizer"].transform(X),
                y,
                classes=self.classes_
            )
            self._is_initialized = True
        else:
            self.model.named_steps["sgdclassifier"].partial_fit(
                self.model.named_steps["hashingvectorizer"].transform(X),
                y
            )

    def predict(self, texts: List[str]) -> List[int]:
        """
        दिए गए टेक्स्ट पर भविष्यवाणी (prediction) करता है।
        """
        if not self._is_initialized:
            raise RuntimeError("Model अभी तक train नहीं हुआ। पहले partial_train चलाएँ।")

        X = texts
        preds = self.model.named_steps["sgdclassifier"].predict(
            self.model.named_steps["hashingvectorizer"].transform(X)
        )
        return preds.tolist()


# ----------------- यहाँ से "Online Learning Loop" शुरू होता है ----------------- #

def get_new_data_from_api() -> List[Tuple[str, int]]:
    """
    यह सिर्फ एक placeholder है।
    असली App में यहाँ:
      - तुम्हारा Backend,
      - Database,
      - या Web/API से आने वाला नया डेटा जोड़ेगा।
    
    अभी डेमो के लिए हम दो वाक्य और उनके labels लौटाते हैं॥
    label 1 = positive, 0 = negative (उदाहरण)
    """
    demo_data = [
        ("यह product बहुत अच्छा है", 1),
        ("मुझे यह service बिल्कुल पसंद नहीं आई", 0),
    ]
    return demo_data


def run_online_learning_loop(sleep_seconds: int = 60):
    """
    यह फ़ंक्शन लगातार:
      1. नया डेटा लाता है (get_new_data_from_api)
      2. उस पर partial_train करता है
      3. चाहे तो बीच-बीच में टेस्ट भी कर सकता है
    
    असली App में इसे:
      - Cron Job से,
      - या Background worker से,
      - या किसी Admin action से चलाया जा सकता है।
    """
    learner = OnlineTextLearner(classes=[0, 1])

    while True:
        # 1. नया डेटा लाओ
        new_samples = get_new_data_from_api()

        if not new_samples:
            print("कोई नया डेटा नहीं मिला, थोड़ी देर बाद पुनः प्रयास होगा...")
        else:
            texts, labels = zip(*new_samples)
            texts = list(texts)
            labels = list(labels)

            # 2. मॉडल को online अपडेट करो
            learner.partial_train(texts, labels)
            print(f"{len(texts)} नए उदाहरणों पर मॉडल को online अपडेट किया गया।")

            # 3. चाहे तो यहाँ पर test prediction भी कर सकते हैं
            test_texts = ["यह सेवा शानदार है", "बहुत खराब अनुभव रहा"]
            preds = learner.predict(test_texts)
            print("टेस्ट वाक्य:", test_texts)
            print("अनुमानित लेबल:", preds)

        # 4. अगली बार तक इंतज़ार
        print(f"{sleep_seconds} सेकंड के लिए विराम...\n")
        time.sleep(sleep_seconds)


if __name__ == "__main__":
    # डेमो के लिए loop चलाने का entry point
    # असली server में इसे background में चलाया जाएगा।
    run_online_learning_loop(sleep_seconds=300)
