from fastapi import APIRouter

router = APIRouter()

@router.get("/burnout-risk")
def burnout():
    return {"risk_prediction": "High Burnout Risk"}