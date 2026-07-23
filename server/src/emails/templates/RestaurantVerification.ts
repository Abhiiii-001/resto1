import { renderLayout } from '../components/Layout';
import { renderButton } from '../components/Button';
import { renderFallbackLink } from '../components/Card';
import { emailTokens } from '../styles/tokens';

export interface RestaurantVerificationParams {
  restaurantName: string;
  ownerName: string;
  verificationUrl: string;
}

export function renderRestaurantVerification(params: RestaurantVerificationParams): { html: string; text: string } {
  const { restaurantName, ownerName, verificationUrl } = params;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      Verify Your Restaurant Account
    </h2>

    <p style="margin-top: 0; margin-bottom: 16px;">
      Hi <strong>${ownerName || 'Restaurant Owner'}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 20px;">
      Thank you for registering <strong>${restaurantName}</strong> on <strong>Restroo</strong>. To activate your account and access your online management suite, please verify your email address.
    </p>

    ${renderButton({
      text: 'Verify Email Address',
      url: verificationUrl,
      variant: 'primary',
    })}

    <p style="font-size: 13px; color: ${emailTokens.colors.slate500}; margin-top: 24px; margin-bottom: 0;">
      <strong>Note:</strong> This verification link will expire in 24 hours for security reasons.
    </p>

    <p style="font-size: 13px; color: ${emailTokens.colors.slate500}; margin-top: 8px; margin-bottom: 0;">
      If you did not sign up for a Restroo account, you can safely ignore this email.
    </p>

    ${renderFallbackLink(verificationUrl)}
  `;

  const html = renderLayout({
    content,
    preheader: `Verify email address for ${restaurantName} on Restroo`,
  });

  const text = `
Verify Your Restaurant Account - Restroo

Hi ${ownerName || 'Restaurant Owner'},

Thank you for registering ${restaurantName} on Restroo. Please verify your email address by clicking the link below:

${verificationUrl}

Note: This link will expire in 24 hours.

If you did not create a Restroo account, please ignore this message.

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
}
