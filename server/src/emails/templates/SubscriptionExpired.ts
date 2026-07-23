import { renderLayout } from '../components/Layout';
import { renderButton } from '../components/Button';
import { renderCard } from '../components/Card';
import { emailTokens } from '../styles/tokens';

export interface SubscriptionExpiredParams {
  restaurantName: string;
  planName: string;
  renewUrl: string;
}

export function renderSubscriptionExpired(params: SubscriptionExpiredParams): { html: string; text: string } {
  const { restaurantName, planName, renewUrl } = params;

  const content = `
    <div style="background-color: ${emailTokens.colors.rose50}; border: 1px solid #fecdd3; border-radius: ${emailTokens.borders.radiusLg}; padding: 18px 20px; margin-bottom: 24px;">
      <span style="display: inline-block; background-color: ${emailTokens.colors.rose600}; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
        Action Required
      </span>
      <h2 style="font-size: 18px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin: 8px 0 0 0;">
        Your Subscription Has Expired
      </h2>
    </div>

    <p style="margin-top: 0; margin-bottom: 16px;">
      Hi Team at <strong>${restaurantName}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 20px;">
      The <strong>${planName}</strong> plan subscription for <strong>${restaurantName}</strong> has expired. As a result, your workspace has been temporarily transitioned to restricted access.
    </p>

    ${renderCard({
      title: '⚠️ Affected Features Under Restricted Access:',
      variant: 'danger',
      content: `
        <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>QR Table Scans & Orders:</strong> Customer self-service table ordering is paused.</li>
          <li><strong>Staff Account Access:</strong> Additional staff logins are temporarily disabled.</li>
          <li><strong>Product & Category Additions:</strong> Creating new menu items is locked.</li>
        </ul>
      `,
    })}

    <p style="margin-top: 0; margin-bottom: 20px;">
      Don't worry—all your restaurant data, custom menus, QR codes, and sales records remain completely safe. Renew your subscription now to instantly restore full access.
    </p>

    ${renderButton({
      text: 'Reactivate Subscription Now',
      url: renewUrl,
      variant: 'danger',
    })}

    <p style="font-size: 13px; color: ${emailTokens.colors.slate500}; margin-top: 24px; margin-bottom: 0;">
      If you need assistance or require an extension, please contact our support team at <a href="mailto:${emailTokens.company.supportEmail}" style="color: ${emailTokens.colors.primary}; text-decoration: underline;">${emailTokens.company.supportEmail}</a>.
    </p>
  `;

  const html = renderLayout({
    content,
    preheader: `Alert: ${restaurantName} subscription has expired. Reactivate to restore full access.`,
  });

  const text = `
Subscription Expired - Restroo

Hi Team at ${restaurantName},

The ${planName} subscription for ${restaurantName} has expired. Your workspace has been transitioned to restricted access.

Affected Features:
• QR Table Scans & Orders paused
• Staff logins disabled
• Menu creation locked

All your data and menu records remain safe. Reactivate your subscription here:
${renewUrl}

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
}
