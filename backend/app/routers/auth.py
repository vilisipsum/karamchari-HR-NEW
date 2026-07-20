from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from backend.app.database import get_db
from backend.app.models import Organization, User, Hub
from backend.app.auth_utils import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])

class UserRegister(BaseModel):
    org_name: str
    email: EmailStr
    password: str
    dpdp_consent: bool

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

@router.post("/register", response_model=Token)
def register(data: UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )

    # 1. Create Organization
    org = Organization(
        name=data.org_name,
        plan_tier="starter",
        employee_cap=50,
        dpdp_consent_flags={"dpdp_consent": data.dpdp_consent}
    )
    db.add(org)
    db.commit()
    db.refresh(org)

    # 1b. Create Default Noida BKC Hub
    hub = Hub(
        org_id=org.id,
        name="Noida BKC Hub",
        city="Noida",
        geofence_center_lat=28.5355,
        geofence_center_lng=77.3910,
        geofence_radius_m=200
    )
    db.add(hub)
    db.commit()

    # 2. Create Admin User linked to organization
    hashed_pwd = hash_password(data.password)
    user = User(
        org_id=org.id,
        email=data.email,
        role="admin", # Registrant is assigned the "admin" Role
        password_hash=hashed_pwd
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # 3. Create Token
    token_data = {"sub": str(user.id), "role": user.role, "org_id": str(org.id)}
    access_token = create_access_token(data=token_data)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role
    }

@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not user.password_hash or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    token_data = {"sub": str(user.id), "role": user.role, "org_id": str(user.org_id)}
    access_token = create_access_token(data=token_data)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role
    }
