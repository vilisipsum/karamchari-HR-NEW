from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.database import engine, Base
from backend.app.routers import auth

# Create database tables on startup (simplest approach for MVP)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KaramcharHR API",
    description="Indian-first compliance HRMS and Payroll engine",
    version="1.0.0"
)

# CORS configuration to allow local Next.js frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "KaramcharHR API"}
