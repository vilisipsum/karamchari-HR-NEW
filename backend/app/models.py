import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Integer, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    pan = Column(String(100), nullable=True) # Indian Tax Registration PAN
    plan_tier = Column(String(50), default="starter", nullable=False) # starter, growth, enterprise
    employee_cap = Column(Integer, default=50, nullable=False) # Starter cap is 50 employees
    dpdp_consent_flags = Column(JSON, default=dict) # DPDP compliance flags
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    users = relationship("User", back_populates="organization", cascade="all, delete-orphan")
    hubs = relationship("Hub", back_populates="organization", cascade="all, delete-orphan")

class Hub(Base):
    __tablename__ = "hubs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False) # e.g., Noida BKC Hub
    city = Column(String(255), nullable=False)
    geofence_center_lat = Column(Float, nullable=False)
    geofence_center_lng = Column(Float, nullable=False)
    geofence_radius_m = Column(Integer, default=100, nullable=False) # Default 100 meters radius
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    organization = relationship("Organization", back_populates="hubs")

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    role = Column(String(50), default="employee", nullable=False) # admin, hr, manager, employee
    auth_provider = Column(String(50), default="credentials", nullable=False) # credentials, google
    password_hash = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    organization = relationship("Organization", back_populates="users")
