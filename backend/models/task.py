from sqlalchemy import Column, Integer, String
from database import Base

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String)
    status = Column(String)
    hours_worked = Column(Integer)
    delay_days = Column(Integer)


