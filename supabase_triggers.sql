-- supabase_triggers.sql
-- Database Triggers for KaramcharHR SMTP Alerts
-- Invokes the 'send-email' Supabase Edge Function when state updates occur.

-- Ensure pg_net extension is enabled (used for HTTP requests from Postgres)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Helper function to trigger send-email edge function asynchronously
CREATE OR REPLACE FUNCTION public.invoke_send_email_webhook(
  to_email TEXT,
  mail_subject TEXT,
  html_body TEXT
) RETURNS VOID AS $$
DECLARE
  project_ref TEXT := 'placeholder-project'; -- Replace with your Supabase Project ID
  url TEXT;
  anon_key TEXT;
BEGIN
  -- Build the Edge Function endpoint URL
  url := 'https://' || project_ref || '.supabase.co/functions/v1/send-email';
  
  -- Retrieve the Service Role Key or API Key to authenticate the request
  -- In production, we configure this or use vault parameters
  SELECT value INTO anon_key FROM decrypted_secrets WHERE name = 'service_role_key' LIMIT 1;
  IF anon_key IS NULL THEN
    anon_key := 'placeholder-api-key';
  END IF;

  -- Dispatch HTTP POST request using pg_net
  PERFORM net.http_post(
    url := url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || anon_key
    ),
    body := jsonb_build_object(
      'to', to_email,
      'subject', mail_subject,
      'html', html_body
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. LEAVE REQUESTS TRIGGER
-- Fires when a leave request is submitted (pending) or updated (approved/rejected).
CREATE OR REPLACE FUNCTION public.on_leave_request_change()
RETURNS TRIGGER AS $$
DECLARE
  emp_email TEXT;
  emp_name TEXT;
  manager_email TEXT;
  subject_text TEXT;
  body_text TEXT;
BEGIN
  -- Fetch Employee profile email & name
  SELECT p.email, p.full_name INTO emp_email, emp_name
  FROM employees e
  JOIN profiles p ON e.profile_id = p.id
  WHERE e.id = NEW.employee_id;

  -- Fetch Manager/HR profile email to alert them on INSERT
  SELECT p.email INTO manager_email
  FROM profiles p
  WHERE p.organization_id = NEW.organization_id AND p.role IN ('hr_manager', 'org_admin')
  LIMIT 1;

  IF (TG_OP = 'INSERT') THEN
    -- Alert HR/Manager
    IF manager_email IS NOT EXISTS THEN
      manager_email := 'hr@company.in';
    END IF;
    
    subject_text := 'KaramcharHR - New Leave Application: ' || emp_name;
    body_text := '<h3>New Leave Application</h3>' ||
                 '<p>Employee <strong>' || emp_name || '</strong> has applied for leaves.</p>' ||
                 '<p>Duration: ' || NEW.duration_days || ' days (' || NEW.start_date || ' to ' || NEW.end_date || ')</p>' ||
                 '<p>Reason: <em>' || NEW.reason || '</em></p>';
                 
    PERFORM public.invoke_send_email_webhook(manager_email, subject_text, body_text);

  ELSIF (TG_OP = 'UPDATE' AND OLD.status <> NEW.status) THEN
    -- Alert Employee on status change (approval / rejection)
    subject_text := 'KaramcharHR - Leave Request ' || UPPER(NEW.status);
    body_text := '<h3>Leave Application Status Update</h3>' ||
                 '<p>Hello <strong>' || emp_name || '</strong>,</p>' ||
                 '<p>Your request for ' || NEW.duration_days || ' days (' || NEW.start_date || ' to ' || NEW.end_date || ') has been ' || UPPER(NEW.status) || '.</p>';
                 
    PERFORM public.invoke_send_email_webhook(emp_email, subject_text, body_text);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_leave_request_change
AFTER INSERT OR UPDATE ON public.leave_requests
FOR EACH ROW EXECUTE FUNCTION public.on_leave_request_change();


-- 2. EXPENSE CLAIMS TRIGGER
-- Fires when an expense is filed or processed.
CREATE OR REPLACE FUNCTION public.on_expense_claim_change()
RETURNS TRIGGER AS $$
DECLARE
  emp_email TEXT;
  emp_name TEXT;
  finance_email TEXT;
  subject_text TEXT;
  body_text TEXT;
BEGIN
  SELECT p.email, p.full_name INTO emp_email, emp_name
  FROM employees e
  JOIN profiles p ON e.profile_id = p.id
  WHERE e.id = NEW.employee_id;

  SELECT p.email INTO finance_email
  FROM profiles p
  WHERE p.organization_id = NEW.organization_id AND p.role IN ('org_admin', 'super_admin')
  LIMIT 1;

  IF (TG_OP = 'INSERT') THEN
    IF finance_email IS NOT EXISTS THEN
      finance_email := 'finance@company.in';
    END IF;
    
    subject_text := 'KaramcharHR - New Expense Claim: ' || emp_name;
    body_text := '<h3>New Expense Claim Submitted</h3>' ||
                 '<p>Employee <strong>' || emp_name || '</strong> filed an expense claim.</p>' ||
                 '<p>Item: <strong>' || NEW.title || '</strong></p>' ||
                 '<p>Amount: <strong>₹' || NEW.amount || '</strong> (Category: ' || NEW.category || ')</p>';
                 
    PERFORM public.invoke_send_email_webhook(finance_email, subject_text, body_text);

  ELSIF (TG_OP = 'UPDATE' AND OLD.status <> NEW.status) THEN
    subject_text := 'KaramcharHR - Expense Claim ' || UPPER(NEW.status);
    body_text := '<h3>Expense Reimbursement Update</h3>' ||
                 '<p>Hello <strong>' || emp_name || '</strong>,</p>' ||
                 '<p>Your expense claim for "' || NEW.title || '" of ₹' || NEW.amount || ' has been ' || UPPER(NEW.status) || '.</p>';
                 
    PERFORM public.invoke_send_email_webhook(emp_email, subject_text, body_text);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_expense_claim_change
AFTER INSERT OR UPDATE ON public.expense_claims
FOR EACH ROW EXECUTE FUNCTION public.on_expense_claim_change();
