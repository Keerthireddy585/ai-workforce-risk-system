# api generates analytics dynamically
from fastapi import APIRouter
from analytics.productivity_analytics import calculate_productivity
from core.auth import verify_token, require_role
from fastapi import Header

from analytics.workload_analytics import analyze_workload
from analytics.bottleneck_detection import detect_bottleneck
from analytics.trend_analysis import analyze_trend

from database import SessionLocal
from models.employee import Employee

router = APIRouter()

# hardcoded
# @router.get("/productivity-score")
# def productivity():
#     score = calculate_productivity(8,2)
#     return{"productivity_score": score}
#     return {"message": "analytics working"}
@router.get("/productivity-score")
def productivity():

    db = SessionLocal()

    employees = db.query(Employee).all()

    db.close()

    if len(employees) == 0:
        return {
            "productivity_score": 0
        }

    total_score = 0

    for emp in employees:

        score = calculate_productivity(
            emp.tasks_completed or 0,
            emp.delay_days or 0
        )

        total_score += score

    average_score = round(total_score / len(employees))

    return {
        "productivity_score": average_score
    }

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

#  project risk api (hardcoded)
# @router.get("/project-risk")
# def project_risk():
#     return {"project_risk": "Medium"}
@router.get("/project-risk")
def project_risk():

    db = SessionLocal()

    employees = db.query(Employee).all()

    db.close()

    if len(employees) == 0:
        return {
            "project_risk": "No Data"
        }

    total_delay = 0

    for emp in employees:
        total_delay += emp.delay_days or 0

    average_delay = total_delay / len(employees)

    if average_delay > 5:
        risk = "High"
    elif average_delay > 2:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "project_risk": risk
    }

# anomaly alerts api (hardcoded)
# @router.get("/anomaly-alert")
# def anomaly_alert():
#     return{"anomaly_alert": "Suspicious Activity Detected"}
@router.get("/anomaly-alert")
def anomaly_alert():

    db = SessionLocal()

    employees = db.query(Employee).all()

    db.close()

    for emp in employees:

        if (
            (emp.hours_worked or 0) > 60
            or (emp.risk_score or 0) > 90
            or (emp.delay_days or 0) > 7
        ):
            return {
                "anomaly_alert": "Suspicious Activity Detected"
            }

    return {
        "anomaly_alert": "No Anomalies Detected"
    }

@router.get("/bottleneck-detection")
def bottleneck_detection():

    db = SessionLocal()

    employees = db.query(Employee).all()

    db.close()

    bottlenecks = []

    for emp in employees:

        result = detect_bottleneck(
            emp.delay_days or 0
        )

        if result == "Workflow Bottleneck Detected":

            bottlenecks.append({
                "employee_id": emp.id,
                "employee_name": emp.name,
                "delay_days": emp.delay_days
            })

    return {
        "bottlenecks": bottlenecks
    }

@router.get("/risk-trend")
def risk_trend():

    db = SessionLocal()

    employees = db.query(Employee).all()

    db.close()

    if len(employees) < 2:
        return {
            "trend": "Not Enough Data"
        }

    scores = []

    for emp in employees:

        scores.append(
            emp.risk_score or 0
        )

    trend = analyze_trend(scores)

    return {
        "risk_scores": scores,
        "trend": trend
    }


# workload analytics api (hardcoded)
# @router.get("/workload-status")
# def workload_status():
#     return {"workload_status": "Overloaded"}
@router.get("/workload-status")
def workload_status():

    db = SessionLocal()

    employees = db.query(Employee).all()

    db.close()

    if len(employees) == 0:
        return {
            "workload_status": "No Data"
        }

    total_hours = 0

    for emp in employees:
        total_hours += emp.hours_worked or 0

    average_hours = total_hours / len(employees)

    if average_hours > 45:
        status = "Overloaded"
    elif average_hours > 35:
        status = "Balanced"
    else:
        status = "Underloaded"

    return {
        "workload_status": status
    }

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