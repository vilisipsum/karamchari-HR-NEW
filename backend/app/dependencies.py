from fastapi import Header, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User
from backend.app.auth_utils import decode_access_token

def get_current_user(authorization: str = Header(...), db: Session = Depends(get_db)) -> User:
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header scheme."
        )
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid token."
        )
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found."
        )
    return user

class RoleRequired:
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: User = Depends(get_current_user)):
        if current_user.role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied: insufficient permissions."
            )
        return current_user
