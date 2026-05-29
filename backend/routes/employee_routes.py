from fastapi import APIRouter

router = APIRouter()

@router.get("/employees")
def get_employees():
    return [
        {"name":"John", "risk_score":78},
        {"name":"Alice", "risk_score":45}
    ]

@router.post("/employees")
def create_employee():
    return {"message": "Employee Created"}