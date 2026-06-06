from sqlalchemy import Column, Integer, String

from database import Base


class EmployeeHistory(Base):

    __tablename__ = "employee_history"

    id = Column(Integer, primary_key=True)

    employee_id = Column(Integer)

    risk_score = Column(Integer)

    productivity_score = Column(Integer)

    burnout_risk = Column(String)