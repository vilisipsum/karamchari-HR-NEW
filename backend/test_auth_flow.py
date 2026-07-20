# backend/test_auth_flow.py
# Automated integration test script for Organization and User registration/login flows

import os
import sys

# Append backend parent directory to path so imports work correctly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app.database import engine, Base, SessionLocal
from backend.app.models import Organization, User
from backend.app.auth_utils import hash_password, verify_password, create_access_token, decode_access_token

def run_test():
    print("--- Starting Auth & Org Flow Integration Tests ---")
    
    # 1. Initialize clean test database schema
    print("[1/5] Re-creating database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 2. Test Org Creation
        print("[2/5] Creating organization record...")
        org = Organization(
            name="Test Solutions India Pvt Ltd",
            pan="ABCDE1234F",
            dpdp_consent_flags={"dpdp_consent": True}
        )
        db.add(org)
        db.commit()
        db.refresh(org)
        assert org.id is not None
        print(f" -> Organization created successfully. ID: {org.id}")

        # 3. Test User Registration with Hashed Password
        print("[3/5] Registering admin user with hashed password...")
        plain_password = "secure_password_123"
        hashed = hash_password(plain_password)
        
        user = User(
            org_id=org.id,
            email="admin@testsolutions.in",
            role="admin",
            password_hash=hashed
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        assert user.id is not None
        assert user.role == "admin"
        assert verify_password(plain_password, user.password_hash) is True
        print(f" -> Admin user registered successfully. ID: {user.id}")

        # 4. Test Token Generation and Decryption
        print("[4/5] Testing JWT token generation and decryption payload...")
        token_payload = {"sub": str(user.id), "role": user.role, "org_id": str(user.org_id)}
        token = create_access_token(data=token_payload)
        assert token is not None
        
        decoded = decode_access_token(token)
        assert decoded is not None
        assert decoded["sub"] == str(user.id)
        assert decoded["role"] == "admin"
        assert decoded["org_id"] == str(org.id)
        print(" -> Access token generated and decrypted successfully.")

        # 5. Validate Password Mismatch Safeguard
        print("[5/5] Testing password validation mismatch checks...")
        assert verify_password("wrong_password", user.password_hash) is False
        print(" -> Password verification failure correctly blocked unauthorized access.")

        print("\n--- ALL TESTS COMPLETED SUCCESSFULLY (PASSED) ---")
    except Exception as e:
        print(f"\n!!! TEST FAILED: {str(e)} !!!")
        db.close()
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    run_test()
