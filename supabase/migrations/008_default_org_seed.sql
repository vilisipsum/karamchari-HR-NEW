-- ─── Seed Default Organization ───
INSERT INTO organizations (id, name, slug, plan, settings)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'KaramcharHR Enterprise',
  'karamcharhr-demo',
  'enterprise',
  '{"currency": "INR", "timezone": "Asia/Kolkata"}'
) ON CONFLICT (id) DO NOTHING;

-- ─── Seed Departments ───
INSERT INTO departments (id, name, code, org_id)
VALUES 
  ('b0000000-0000-0000-0000-000000000001', 'Engineering', 'ENG', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000002', 'Human Resources', 'HR', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000003', 'Product & Design', 'PRD', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000004', 'Sales & Marketing', 'SLS', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000005', 'Finance & Legal', 'FIN', 'a0000000-0000-0000-0000-000000000001')
ON CONFLICT (code, org_id) DO NOTHING;

-- ─── Seed Designations ───
INSERT INTO designations (id, title, level, org_id)
VALUES 
  ('c0000000-0000-0000-0000-000000000001', 'Software Engineer', 1, 'a0000000-0000-0000-0000-000000000001'),
  ('c0000000-0000-0000-0000-000000000002', 'Senior Software Engineer', 2, 'a0000000-0000-0000-0000-000000000001'),
  ('c0000000-0000-0000-0000-000000000003', 'Engineering Manager', 3, 'a0000000-0000-0000-0000-000000000001'),
  ('c0000000-0000-0000-0000-000000000004', 'HR Specialist', 1, 'a0000000-0000-0000-0000-000000000001'),
  ('c0000000-0000-0000-0000-000000000005', 'HR Director', 4, 'a0000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

-- ─── Seed Default Shifts ───
INSERT INTO shifts (id, name, start_time, end_time, grace_period_minutes, org_id)
VALUES (
  'd0000000-0000-0000-0000-000000000001',
  'Standard General Shift',
  '09:00:00',
  '18:00:00',
  15,
  'a0000000-0000-0000-0000-000000000001'
) ON CONFLICT DO NOTHING;

-- ─── Seed Default Leave Types ───
INSERT INTO leave_types (name, code, description, days_per_year, max_consecutive_days, max_carry_forward, is_paid, gender_specific, org_id)
SELECT 'Casual Leave', 'CL', 'Urgent/personal work - no reason needed', 12, 3, 0, true, 'both', 'a0000000-0000-0000-0000-000000000001'
WHERE NOT EXISTS (SELECT 1 FROM leave_types WHERE code = 'CL' AND org_id = 'a0000000-0000-0000-0000-000000000001');

INSERT INTO leave_types (name, code, description, days_per_year, max_consecutive_days, max_carry_forward, is_paid, gender_specific, org_id)
SELECT 'Sick Leave', 'SL', 'Medical reasons with doctor certificate if >2 days', 10, 5, 0, true, 'both', 'a0000000-0000-0000-0000-000000000001'
WHERE NOT EXISTS (SELECT 1 FROM leave_types WHERE code = 'SL' AND org_id = 'a0000000-0000-0000-0000-000000000001');

INSERT INTO leave_types (name, code, description, days_per_year, max_consecutive_days, max_carry_forward, is_paid, gender_specific, org_id)
SELECT 'Earned Leave', 'EL', 'Privilege leave / planned time off', 15, 15, 15, true, 'both', 'a0000000-0000-0000-0000-000000000001'
WHERE NOT EXISTS (SELECT 1 FROM leave_types WHERE code = 'EL' AND org_id = 'a0000000-0000-0000-0000-000000000001');
