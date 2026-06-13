from pydantic import BaseModel

class EmployeeCreate(BaseModel):

    name: str

    department: str

    hours_worked: int

    tasks_completed: int

    delay_days: int