# creating login authentication API

from fastapi import APIRouter
from core.auth import create_access_token
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str
    role: str

# testing it for admin
# @router.post("/login")
# def login():

#     access_token = create_access_token(

#         data={
#             "sub": "admin",
#             "role": "Admin"
#         }

#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer"
#     }


# testing it for manager
@router.post("/login")
def login(request: LoginRequest):

    users = {
        "admin": {
            "password": "admin123",
            "role": "Admin"
        },
        "manager": {
            "password": "manager123",
            "role": "Manager"
        },
        "employee": {
            "password": "employee123",
            "role": "Employee"
        }
    }

    user = users.get(request.username.lower())

    if not user:
        return {"error": "Invalid username"}

    if user["password"] != request.password:
        return {"error": "Invalid password"}

    if user["role"] != request.role:
        return {"error": "Role mismatch"}

    access_token = create_access_token(
        data={
            "sub": request.username,
            "role": request.role
        }
    )
    
    print("LOGIN USER:", request.username)
    print("LOGIN ROLE:", request.role)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": request.role
    }


# @router.post("/login")
# def login(request: LoginRequest):
#      users = {
#         "admin": {
#             "password": "admin123",
#             "role": "Admin"
#         },
#         "manager": {
#             "password": "manager123",
#             "role": "Manager"
#         },
#         "employee": {
#             "password": "employee123",
#             "role": "Employee"
#         }
#     }

#     user = users.get(request.username.lower())

#     if not user:
#         return {"error": "Invalid username"}

#     if user["password"] != request.password:
#         return {"error": "Invalid password"}

#     if user["role"] != request.role:
#         return {"error": "Role mismatch"}

#     access_token = create_access_token(

#         data={
#             "sub": request.username,
#             "role": request.role
#         }

#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer",
#         "role": request.role
#     }