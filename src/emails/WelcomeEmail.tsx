import React from 'react';

interface WelcomeEmailProps {
  employeeName: string;
  loginUrl: string;
  employeeCode: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  employeeName,
  loginUrl,
  employeeCode
}) => {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8fafc',
      padding: '40px 20px',
      color: '#0f172a'
    }}>
      <div style={{
        maxWidth: '580px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Brand logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderRadius: '10px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '20px',
            lineHeight: '40px'
          }}>
            K
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 0 0', letterSpacing: '-0.025em' }}>
            Welcome to KaramcharHR
          </h2>
        </div>

        <p style={{ fontSize: '15px', lineHeight: '24px', color: '#334155' }}>
          Namaste <strong>{employeeName}</strong>,
        </p>
        <p style={{ fontSize: '14px', lineHeight: '22px', color: '#475569' }}>
          Your profile has been created successfully in our system. You can now log into the portal to check in daily, declare taxes, apply for leaves, and download your monthly payslips.
        </p>

        {/* Credentials table */}
        <div style={{
          backgroundColor: '#f1f5f9',
          borderRadius: '12px',
          padding: '16px',
          margin: '24px 0',
          border: '1px solid #e2e8f0'
        }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ color: '#64748b', paddingBottom: '8px', fontWeight: '600' }}>Employee Code:</td>
                <td style={{ color: '#0f172a', paddingBottom: '8px', fontWeight: 'bold' }}>{employeeCode}</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b', fontWeight: '600' }}>Portal Access:</td>
                <td><a href={loginUrl} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>{loginUrl}</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '13px', lineHeight: '20px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
          If you have any queries regarding your onboarding documents, please contact your HR representative.
        </p>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '16px', textAlign: 'center' }}>
          © 2026 KaramcharHR. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default WelcomeEmail;
