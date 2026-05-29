# creating login authentication API

from fastapi import APIRouter
from core.auth import create_access_token

router = APIRouter()


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
def login():

    access_token = create_access_token(

        data={
            "sub": "manager",
            "role": "Manager"
        }

    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }