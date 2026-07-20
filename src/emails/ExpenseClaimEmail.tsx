import React from 'react';

interface ExpenseClaimEmailProps {
  employeeName: string;
  title: string;
  amount: number;
  category: string;
  claimDate: string;
  status: 'pending' | 'approved' | 'rejected';
  actionUrl: string;
}

export const ExpenseClaimEmail: React.FC<ExpenseClaimEmailProps> = ({
  employeeName,
  title,
  amount,
  category,
  claimDate,
  status,
  actionUrl
}) => {
  const isPending = status === 'pending';

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
            {isPending ? 'New Expense Claim Filed' : `Expense Claim Update: ${status.toUpperCase()}`}
          </h2>
        </div>

        <p style={{ fontSize: '15px', lineHeight: '24px', color: '#334155' }}>
          {isPending 
            ? `Dear Finance team, a corporate bill claim has been filed by ${employeeName} for processing.` 
            : `Hello ${employeeName}, your corporate expense reimbursement request status has been updated.`}
        </p>

        {/* Claim details block */}
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
                <td style={{ color: '#64748b', paddingBottom: '8px', fontWeight: '600' }}>Item/Title:</td>
                <td style={{ color: '#0f172a', paddingBottom: '8px', fontWeight: 'bold' }}>{title}</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b', paddingBottom: '8px', fontWeight: '600' }}>Amount:</td>
                <td style={{ color: '#2563eb', paddingBottom: '8px', fontWeight: 'extrabold' }}>₹{amount.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b', paddingBottom: '8px', fontWeight: '600' }}>Category:</td>
                <td style={{ color: '#0f172a', paddingBottom: '8px', fontWeight: 'bold' }}>{category}</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b', paddingBottom: '8px', fontWeight: '600' }}>Billing Date:</td>
                <td style={{ color: '#0f172a', paddingBottom: '8px' }}>{claimDate}</td>
              </tr>
              <tr>
                <td style={{ color: '#64748b', fontWeight: '600' }}>Current Status:</td>
                <td>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: status === 'approved' ? '#dcfce7' : status === 'rejected' ? '#fee2e2' : '#fef9c3',
                    color: status === 'approved' ? '#166534' : status === 'rejected' ? '#991b1b' : '#854d0e'
                  }}>{status}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Button */}
        {isPending && (
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
              Verify & Approve Claim
            </a>
          </div>
        )}

        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '16px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
          © 2026 KaramcharHR. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ExpenseClaimEmail;
