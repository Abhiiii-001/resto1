import {
  renderRestaurantVerification,
  renderUserVerification,
  renderRestaurantWelcome,
  renderUserWelcome,
  renderSubscriptionExpiry,
  renderSubscriptionExpired,
  renderLayout,
  emailTokens,
} from '../emails';
import { renderButton } from '../emails/components/Button';
import { renderCard, renderFallbackLink } from '../emails/components/Card';

// Re-export core email engine components & tokens
export {
  renderRestaurantVerification,
  renderUserVerification,
  renderRestaurantWelcome,
  renderUserWelcome,
  renderSubscriptionExpiry,
  renderSubscriptionExpired,
  renderLayout as baseTemplate,
  emailTokens,
};

// Backward-compatible wrapper for verification emails
export const verificationEmailTemplate = (link: string, title?: string, message?: string) => {
  return renderRestaurantVerification({
    restaurantName: 'Restroo Workspace',
    ownerName: 'Valued User',
    verificationUrl: link,
  });
};

// Backward-compatible wrapper for welcome emails
export const welcomeEmailTemplate = (name: string, role: 'Restaurant' | 'User') => {
  if (role === 'Restaurant') {
    return renderRestaurantWelcome({
      restaurantName: name || 'Your Restaurant',
      ownerName: name || 'Restaurant Owner',
      dashboardUrl: `${process.env.CLIENT_URL || 'https://restro-client.vercel.app'}/dashboard`,
    });
  }
  return renderUserWelcome({
    userName: name || 'User',
    loginUrl: process.env.CLIENT_URL || 'https://restro-client.vercel.app',
  });
};

// Backward-compatible wrapper for employee verified emails
export const employeeVerifiedTemplate = (name: string, loginLink: string) => {
  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      Account Verified! 🎉
    </h2>
    <p style="margin-top: 0; margin-bottom: 16px;">
      Hi <strong>${name || 'Employee'}</strong>,
    </p>
    <p style="margin-top: 0; margin-bottom: 20px;">
      Great news! Your restaurant administrator has verified your employee account. You can now log in to the workspace and start managing operations.
    </p>
    ${renderButton({ text: 'Log In to Workspace', url: loginLink, variant: 'primary' })}
    ${renderFallbackLink(loginLink)}
  `;

  const html = renderLayout({
    content,
    preheader: 'Your employee account has been verified - Log in now',
  });

  const text = `
Account Verified! - Restroo

Hi ${name || 'Employee'},

Your restaurant administrator has verified your employee account. Log in to your workspace here:
${loginLink}

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
};

// Backward-compatible wrapper for reset password emails
export const resetPasswordEmailTemplate = (link: string) => {
  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      Reset Your Password 🔐
    </h2>
    <p style="margin-top: 0; margin-bottom: 16px;">
      We received a request to reset the password for your Restroo account. Click the button below to choose a new password. This link is valid for 60 minutes.
    </p>
    ${renderButton({ text: 'Reset Password', url: link, variant: 'primary' })}
    ${renderCard({
      title: 'Security Notice',
      variant: 'neutral',
      content: 'If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.',
    })}
    ${renderFallbackLink(link)}
  `;

  const html = renderLayout({
    content,
    preheader: 'Reset your Restroo account password',
  });

  const text = `
Reset Your Password - Restroo

We received a request to reset the password for your Restroo account. Use the link below to choose a new password:

${link}

If you did not request a password reset, please ignore this email.

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
};

// Backward-compatible wrapper for subscription expiry
export const subscriptionExpiringTemplate = (planName: string, daysLeft: number) => {
  return renderSubscriptionExpiry({
    restaurantName: 'Your Restaurant',
    planName,
    expiryDate: 'Upcoming',
    daysRemaining: daysLeft,
    renewUrl: `${process.env.CLIENT_URL || 'https://restro-client.vercel.app'}/dashboard/subscription`,
  });
};
