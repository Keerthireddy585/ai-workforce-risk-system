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
            "risk_score": emp.risk_score,
            "hours_worked": emp.hours_worked,
            "tasks_completed": emp.tasks_completed,
            "delay_days": emp.delay_days,
            "burnout_risk": emp.burnout_risk
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

# creating backend delete api
@router.delete("/employees/{employee_id}")
def delete_employee(employee_id: int):

    db = SessionLocal()

    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if employee is None:

        db.close()

        return {
            "message": "Employee not found"
        }

    db.delete(employee)

    db.commit()

    db.close()

    return {
        "message": "Employee deleted"
    }


@router.put("/employees/{employee_id}")
def update_employee(employee_id: int, employee_data: dict):

    db = SessionLocal()

    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if employee is None:

        db.close()

        return {
            "message": "Employee not found"
        }

    employee.name = employee_data.get("name")
    employee.department = employee_data.get("department")
    employee.risk_score = employee_data.get("risk_score")
    employee.hours_worked = employee_data.get("hours_worked")
    employee.tasks_completed = employee_data.get("tasks_completed")
    employee.delay_days = employee_data.get("delay_days")
    employee.burnout_risk = employee_data.get("burnout_risk")

    db.commit()

    db.refresh(employee)

    db.close()

    return {
        "message": "Employee updated"
    }