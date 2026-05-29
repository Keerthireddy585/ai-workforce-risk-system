# first API code
from fastapi import FastAPI             
from routes.employee_routes import router
from routes.analytics_routes import router as analytics_router
from routes.ai_routes import router as ai_router
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Workforce System Running"}
app.include_router(router)

app.include_router(analytics_router)

app.include_router(ai_router)

app.include_router(auth_router)