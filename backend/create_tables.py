from database import engine
from models.employee import Employee
from database import Base
from models.task import Task

Base.metadata.create_all(bind=engine)

print("Tables created succesfully")

