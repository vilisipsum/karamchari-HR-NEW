import React from 'react';

interface PayrollNotificationEmailProps {
  employeeName: string;
  period: string;
  netPay: number;
  pfDeduction: number;
  tdsDeduction: number;
  actionUrl: string;
}

export const PayrollNotificationEmail: React.FC<PayrollNotificationEmailProps> = ({
  employeeName,
  period,
  netPay,
  pfDeduction,
  tdsDeduction,
  actionUrl
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
          <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '12px 0 0 0' }}>
            Payslip Published & Salary Disbursed
          </h2>
        </div>

        <p style={{ fontSize: '15px', lineHeight: '24px', color: '#334155' }}>
          Namaste <strong>{employeeName}</strong>,
        </p>
        <p style={{ fontSize: '14px', lineHeight: '22px', color: '#475569' }}>
          Your monthly salary payslip for the period <strong>{period}</strong> is generated. Your net payment has been disbursed to your registered bank account.
        </p>

        {/* Salary summary details block */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          padding: '18px',
          margin: '24px 0',
          border: '1px solid #e2e8f0'
        }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ color: '#64748b', paddingBottom: '8px', fontWeight: '600' }}>Disbursement Month:</td>
                <td style={{ color: '#0f172a', paddingBottom: '8px', fontWeight: 'bold' }}>{period}</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b', paddingBottom: '8px', fontWeight: '600' }}>Provident Fund (PF):</td>
                <td style={{ color: '#991b1b', paddingBottom: '8px', fontWeight: 'bold' }}>-₹{pfDeduction.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b', paddingBottom: '8px', fontWeight: '600' }}>TDS tax:</td>
                <td style={{ color: '#991b1b', paddingBottom: '8px', fontWeight: 'bold' }}>-₹{tdsDeduction.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ color: '#64748b', paddingTop: '10px', fontWeight: '600' }}>Net Take-Home Salary:</td>
                <td style={{ color: '#166534', paddingTop: '10px', fontWeight: 'extrabold', fontSize: '15px' }}>₹{netPay.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <a href={actionUrl} style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            display: 'inline-block',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
          }}>
            Download Full Payslip
          </a>
        </div>

        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '16px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
          © 2026 KaramcharHR. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PayrollNotificationEmail;
