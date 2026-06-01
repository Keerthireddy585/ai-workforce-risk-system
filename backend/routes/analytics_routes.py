# api generates analytics dynamically
from fastapi import APIRouter
from analytics.productivity_analytics import calculate_productivity
from core.auth import verify_token, require_role
from fastapi import Header

from database import SessionLocal
from models.employee import Employee

router = APIRouter()
@router.get("/productivity-score")
def productivity():
    score = calculate_productivity(8,2)
    return{"productivity_score": score}
    return {"message": "analytics working"}

#  burnout risk api (this is hardcoded)
# @router.get("/burnout-risk")
# def burnout_risk():
#     return { "burnout_risk": "High"}
@router.get("/burnout-risk")
def burnout_risk():

    db = SessionLocal()

    employees = db.query(Employee).all()

    high_count = 0

    for emp in employees:
        if emp.burnout_risk == "High":
            high_count += 1

    db.close()

    if high_count > 0:
        return {
            "burnout_risk": "High"
        }

    return {
        "burnout_risk": "Low"
    }

#  project risk api
@router.get("/project-risk")
def project_risk():
    return {"project_risk": "Medium"}

# anomaly alerts api
@router.get("/anomaly-alert")
def anomaly_alert():
    return{"anomaly_alert": "Suspicious Activity Detected"}

# workload analytics api
@router.get("/workload-status")
def workload_status():
    return {"workload_status": "Overloaded"}

# create manager-only API
@router.get("/manager-dashboard")
def manager_dashboard(token: str):

    payload = verify_token(token)

    if payload is None:

        return {
            "message": "Invalid Token"
        }

    role = payload.get("role")

    require_role(role, ["Manager", "Admin"])

    return {
        "message": "Manager Project Analytics Access Granted"
    }

# create HR-only dashboard API
@router.get("/hr-dashboard")
def hr_dashboard(token: str):

    Authorization: str = Header(None)

    payload = verify_token(token)

    if payload is None:

        return {
            "message": "Invalid Token"
        }

    role = payload.get("role")

    require_role(role, ["HR", "Admin"])

    return {
        "message": "HR Workforce Analytics Access Granted"
    }