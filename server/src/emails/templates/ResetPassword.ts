import { renderLayout } from '../components/Layout';
import { renderButton } from '../components/Button';
import { renderCard, renderFallbackLink } from '../components/Card';
import { emailTokens } from '../styles/tokens';

export interface ResetPasswordParams {
  userName: string;
  resetUrl: string;
}

export function renderResetPassword(params: ResetPasswordParams): { html: string; text: string } {
  const { userName, resetUrl } = params;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      Reset Your Password 🔐
    </h2>

    <p style="margin-top: 0; margin-bottom: 16px;">
      Hi <strong>${userName || 'there'}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 20px;">
      We received a request to reset the password for your Restroo account. Click the button below to choose a new password. This link is valid for 60 minutes.
    </p>

    ${renderButton({
      text: 'Reset Password',
      url: resetUrl,
      variant: 'primary',
    })}

    ${renderCard({
      title: 'Security Notice',
      variant: 'neutral',
      content: 'If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.',
    })}

    ${renderFallbackLink(resetUrl)}
  `;

  const html = renderLayout({
    content,
    preheader: 'Reset your Restroo account password',
  });

  const text = `
Reset Your Password - Restroo

Hi ${userName || 'there'},

We received a request to reset the password for your Restroo account. Use the link below to choose a new password:

${resetUrl}

If you did not request a password reset, please ignore this email.

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
}
