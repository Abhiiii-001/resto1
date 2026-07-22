import { renderLayout } from '../components/Layout';
import { renderButton } from '../components/Button';
import { renderFallbackLink, renderCard } from '../components/Card';
import { emailTokens } from '../styles/tokens';

export interface UserVerificationParams {
  employeeName: string;
  restaurantName: string;
  verificationUrl: string;
}

export function renderUserVerification(params: UserVerificationParams): { html: string; text: string } {
  const { employeeName, restaurantName, verificationUrl } = params;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      Employee Approval Required
    </h2>

    <p style="margin-top: 0; margin-bottom: 16px;">
      Hello <strong>${restaurantName || 'Restaurant Owner'}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 20px;">
      A new employee, <strong>${employeeName || 'a team member'}</strong>, has signed up to join your workspace on Restroo. They cannot access the dashboard or POS until you approve their account.
    </p>

    ${renderCard({ variant: 'warning', content: 'Please verify their details before approving. If you do not recognize this person, you can safely ignore this email and they will not be granted access.' })}

    <div style="margin-top: 24px;">
      ${renderButton({
        text: 'Approve Employee',
        url: verificationUrl,
        variant: 'primary',
      })}
    </div>

    <p style="font-size: 13px; color: ${emailTokens.colors.slate500}; margin-top: 24px; margin-bottom: 0;">
      <strong>Note:</strong> This verification link will expire in 24 hours.
    </p>

    ${renderFallbackLink(verificationUrl)}
  `;

  const html = renderLayout({
    content,
    preheader: `Approve ${employeeName || 'new employee'} to join your Restroo workspace`,
  });

  const text = `
Employee Approval Required

Hello ${restaurantName || 'Restaurant Owner'},

A new employee, ${employeeName || 'a team member'}, has signed up to join your workspace on Restroo. They cannot access the system until you approve their account.

To approve this employee, please click the link below:

${verificationUrl}

If you do not recognize this person, you can safely ignore this email and they will not be granted access.

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
}
