-- schema.sql
-- KaramcharHR Supabase Postgres Schema
-- Designed for Indian compliance, multi-tenancy, and proper role-based access control.

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100),
    tax_number VARCHAR(100), -- e.g., GSTIN / PAN
    primary_office_location TEXT,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- Maps directly to auth.users.id
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'employee' CHECK (role IN ('super_admin', 'org_admin', 'hr_manager', 'manager', 'employee')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. EMPLOYEES
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    designation VARCHAR(155),
    department VARCHAR(155),
    joining_date DATE NOT NULL,
    termination_date DATE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'on_leave', 'terminated')),
    pan_number VARCHAR(10),
    pf_account_number VARCHAR(50),
    esi_account_number VARCHAR(50),
    basic_salary NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    hra NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    da NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    other_allowances NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    clock_in TIMESTAMPTZ,
    clock_out TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half_day', 'on_leave')),
    location_in TEXT,
    location_out TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE (employee_id, date)
);

-- 5. LEAVE TYPES
CREATE TABLE IF NOT EXISTS leave_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL, -- e.g., Casual Leave, Sick Leave, Earned Leave
    allocation_days INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. LEAVE REQUESTS
CREATE TABLE IF NOT EXISTS leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    leave_type_id UUID REFERENCES leave_types(id) ON DELETE RESTRICT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration_days INT NOT NULL,
    reason TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 7. PAYROLL RUNS
CREATE TABLE IF NOT EXISTS payroll_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'paid', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 8. PAYROLL ITEMS
CREATE TABLE IF NOT EXISTS payroll_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payroll_run_id UUID REFERENCES payroll_runs(id) ON DELETE CASCADE NOT NULL,
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
    basic_earnings NUMERIC(12, 2) NOT NULL,
    hra_earnings NUMERIC(12, 2) NOT NULL,
    da_earnings NUMERIC(12, 2) NOT NULL,
    other_earnings NUMERIC(12, 2) NOT NULL,
    pf_deduction NUMERIC(12, 2) NOT NULL,
    esi_deduction NUMERIC(12, 2) NOT NULL,
    tds_deduction NUMERIC(12, 2) NOT NULL,
    other_deductions NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    net_salary NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 9. EXPENSE CLAIMS
CREATE TABLE IF NOT EXISTS expense_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g., Travel, Meals, Office Supplies
    claim_date DATE NOT NULL,
    receipt_url TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 10. ASSETS
CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    serial_number VARCHAR(100),
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'damaged', 'maintenance')),
    assigned_date DATE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS (ROW LEVEL SECURITY) POLICIES
-- Enabling row level security to isolate data by organization_id.

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Policies for RLS
CREATE POLICY tenant_isolation_organizations ON organizations
    FOR ALL USING (
        id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY tenant_isolation_profiles ON profiles
    FOR ALL USING (
        organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY tenant_isolation_employees ON employees
    FOR ALL USING (
        organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY tenant_isolation_attendance ON attendance
    FOR ALL USING (
        organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY tenant_isolation_leave_types ON leave_types
    FOR ALL USING (
        organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY tenant_isolation_leave_requests ON leave_requests
    FOR ALL USING (
        organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY tenant_isolation_payroll_runs ON payroll_runs
    FOR ALL USING (
        organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY tenant_isolation_payroll_items ON payroll_items
    FOR ALL USING (
        payroll_run_id IN (
            SELECT id FROM payroll_runs WHERE organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
        )
    );

CREATE POLICY tenant_isolation_expense_claims ON expense_claims
    FOR ALL USING (
        organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY tenant_isolation_assets ON assets
    FOR ALL USING (
        organization_id = (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );
