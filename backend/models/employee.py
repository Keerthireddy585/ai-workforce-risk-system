from sqlalchemy import Column, Integer, String
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    department = Column(String)

    risk_score = Column(Integer)

    hours_worked = Column(Integer)

    tasks_completed = Column(Integer)

    delay_days = Column(Integer)

    burnout_risk = Column(String)


# making it real employee data
# from sqlalchemy import Column, Integer, String
# from database import Base

# class Employee(Base):

#     __tablename__ = "employees"

#     id = Column(Integer, primary_key=True, index=True)

#     name = Column(String)

#     department = Column(String)

#     hours_worked = Column(Integer)

#     tasks_completed = Column(Integer)

#     delay_days = Column(Integer)

#     burnout_risk = Column(String)