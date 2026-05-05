DELETE FROM freedom_followup_queue WHERE contact_email IN ('deploy-test+contact@example.com','deploy-test+assessment@example.com');
DELETE FROM assessments WHERE contact_email IN ('deploy-test+contact@example.com','deploy-test+assessment@example.com');
DELETE FROM contact_messages WHERE email IN ('deploy-test+contact@example.com','deploy-test+assessment@example.com');
DELETE FROM crm_contacts WHERE email IN ('deploy-test+contact@example.com','deploy-test+assessment@example.com');