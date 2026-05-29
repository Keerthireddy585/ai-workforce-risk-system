from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):

    return pwd_context.hash(password)



def verify_password(plain_password, hashed_password):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )

hashed = hash_password("admin123")
print(hashed)

# creates JWT authentication tokens
from jose import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "supersecretkey"

ALGORITHM = "HS256"



def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(hours=2)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

# testing JWT token
access_token = create_access_token(
    data={"sub": "admin"}
)

print(access_token)


# token verification
from jose import jwt, JWTError

def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        return None
    

from fastapi import HTTPException


def require_role(user_role: str, allowed_roles: list):

    if user_role not in allowed_roles:

        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )