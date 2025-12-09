"""
web_ai_service.py

यह मॉड्यूल OnlineTextLearner को Web App / Frontend से जोड़ने के लिए
एक ultra-advanced FastAPI based web service प्रदान करता है।

मुख्य सुविधाएँ:
- /health          : सर्वर स्टेटस
- /train-online    : वेब से नया labeled डेटा भेजकर मॉडल को online train करना
- /predict         : वेब से टेक्स्ट भेजकर prediction लेना
"""

from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# यह import तुम्हारी पहले वाली फ़ाइल से होगा
# उस फ़ाइल का नाम वही रखें: online_ai_learner.py
from online_ai_learner import OnlineTextLearner


# ----------------- Pydantic Models (Request / Response Schemas) ----------------- #

class TrainItem(BaseModel):
    """
    Web से एक training उदाहरण:
    - text : आपका वाक्य / इनपुट
    - label: उसका class (0, 1, 2 ... जैसे positive / negative आदि)
    """
    text: str
    label: int


class TrainBatch(BaseModel):
    """
    एक साथ कई training उदाहरण भेजने के लिए wrapper।
    """
    items: List[TrainItem]


class PredictRequest(BaseModel):
    """
    Prediction के लिए web से इनपुट:
    - texts : वाक्यों की सूची
    """
    texts: List[str]


class PredictResponse(BaseModel):
    """
    Prediction का standard response:
    - predictions : हर टेक्स्ट के लिए अनुमानित label
    """
    predictions: List[int]


# ----------------- FastAPI App Initialization ----------------- #

app = FastAPI(
    title="ShriVidya Online AI Service",
    description=(
        "यह सेवा OnlineTextLearner को Web App से जोड़ती है "
        "ताकि नया डेटा भेजकर AI मॉडल को online train कराया जा सके "
        "और टेक्स्ट पर live prediction लिया जा सके।"
    ),
    version="1.0.0",
)

# CORS सेट करना ताकि Browser / JS / Frontend आसानी से connect कर सके
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # चाहो तो बाद में specific डोमेन डाल सकती हो
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Online Learner (पूरी ऐप के लिए एक shared instance)
# अभी के लिए binary labels [0, 1] मान लेते हैं, तुम बाद में बदल सकती हो।
learner = OnlineTextLearner(classes=[0, 1])


# ----------------- Health Check Endpoint ----------------- #

@app.get("/health")
async def health_check():
    """
    सर्वर चालू है या नहीं, यह चेक करने के लिए simple endpoint।
    """
    return {"status": "ok", "message": "ShriVidya Online AI Service is running."}


# ----------------- Online Training Endpoint ----------------- #

@app.post("/train-online")
async def train_online(batch: TrainBatch):
    """
    Web / Frontend से नया labeled डेटा लेकर
    OnlineTextLearner को partial_train कराता है।
    
    Example JSON body:
    {
      "items": [
        {"text": "यह product बहुत अच्छा है", "label": 1},
        {"text": "सेवा से मैं संतुष्ट नहीं हूँ", "label": 0}
      ]
    }
    """
    if not batch.items:
        raise HTTPException(status_code=400, detail="कम से कम एक training item आवश्यक है।")

    texts = [item.text for item in batch.items]
    labels = [item.label for item in batch.items]

    # Online learning: थोड़ा-थोड़ा train
    learner.partial_train(texts, labels)

    return {
        "trained_samples": len(texts),
        "detail": "मॉडल को नए डेटा पर online train किया गया।"
    }


# ----------------- Prediction Endpoint ----------------- #

@app.post("/predict", response_model=PredictResponse)
async def predict(req: PredictRequest):
    """
    Web / App से आए टेक्स्ट पर prediction करता है।

    Example JSON body:
    {
      "texts": [
        "यह सेवा शानदार है",
        "बहुत खराब अनुभव रहा"
      ]
    }

    Response:
    {
      "predictions": [1, 0]
    }
    """
    if not req.texts:
        raise HTTPException(status_code=400, detail="कम से कम एक टेक्स्ट आवश्यक है।")

    try:
        preds = learner.predict(req.texts)
    except RuntimeError as e:
        # अगर model अभी तक train नहीं है
        raise HTTPException(status_code=400, detail=str(e))

    return PredictResponse(predictions=preds)


# ----------------- Optional: Root Info ----------------- #

@app.get("/")
async def root():
    """
    Root पर basic information देता है।
    """
    return {
        "service": "ShriVidya Online AI Web Service",
        "version": "1.0.0",
        "endpoints": {
            "GET /health": "सर्वर स्टेटस",
            "POST /train-online": "नए labeled डेटा से मॉडल को online train करना",
            "POST /predict": "टेक्स्ट पर prediction लेना"
        }
    }

# ----------------- Run Instructions (comment) ----------------- #
# इस फ़ाइल को चलाने के लिए (terminal / command line में):
#
#   uvicorn web_ai_service:app --reload --host 0.0.0.0 --port 8000
#
# फिर ब्राउज़र से:
#   http://localhost:8000/docs
# खोलकर सीधे API को test कर सकती हो।
