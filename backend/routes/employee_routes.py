# from fastapi import APIRouter

# router = APIRouter()

# @router.get("/employees")
# def get_employees():
#     return [
#         {"name":"John", "risk_score":78},
#         {"name":"Alice", "risk_score":45}
#     ]

# @router.post("/employees")
# def create_employee():
#     return {"message": "Employee Created"}


from fastapi import APIRouter, Body
from database import SessionLocal
from models.employee import Employee

router = APIRouter()


@router.get("/employees")
def get_employees():
    db = SessionLocal()

    employees = db.query(Employee).all()

    result = []

    for emp in employees:
        result.append({
            "id": emp.id,
            "name": emp.name,
            "department": emp.department,
            "risk_score": emp.risk_score
        })

    db.close()

    return result


@router.post("/employees")
def create_employee(employee_data: dict = Body(...)):

    db = SessionLocal()

    employee = Employee(
        name=employee_data["name"],
        department=employee_data["department"],
        risk_score=employee_data["risk_score"],
        hours_worked=employee_data["hours_worked"],
        tasks_completed=employee_data["tasks_completed"],
        delay_days=employee_data["delay_days"],
        burnout_risk=employee_data["burnout_risk"]
        # name="Keerthi",
        # department="IT",
        # risk_score=80
    )

    db.add(employee)
    db.commit()
    db.refresh(employee)

    db.close()

    return {
        "message": "Employee Created",
        "employee_id": employee.id
    }