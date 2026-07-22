import { renderLayout } from '../components/Layout';
import { renderButton } from '../components/Button';
import { renderCard } from '../components/Card';
import { emailTokens } from '../styles/tokens';

export interface SubscriptionExpiryParams {
  restaurantName: string;
  planName: string;
  expiryDate: string;
  daysRemaining: number;
  renewUrl: string;
}

export function renderSubscriptionExpiry(params: SubscriptionExpiryParams): { html: string; text: string } {
  const { restaurantName, planName, expiryDate, daysRemaining, renewUrl } = params;

  const badgeText = daysRemaining === 1 ? 'Expires Tomorrow' : `Expires in ${daysRemaining} Days`;

  const content = `
    <div style="background-color: ${emailTokens.colors.amber50}; border: 1px solid #fde68a; border-radius: ${emailTokens.borders.radiusLg}; padding: 18px 20px; margin-bottom: 24px;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <span style="display: inline-block; background-color: ${emailTokens.colors.amber600}; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
              ${badgeText}
            </span>
            <h2 style="font-size: 18px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin: 8px 0 0 0;">
              Subscription Renewal Reminder
            </h2>
          </td>
        </tr>
      </table>
    </div>

    <p style="margin-top: 0; margin-bottom: 16px;">
      Hi Team at <strong>${restaurantName}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 20px;">
      Your <strong>${planName}</strong> plan subscription for <strong>${restaurantName}</strong> is scheduled to expire on <strong>${expiryDate}</strong> (${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} remaining).
    </p>

    ${renderCard({
      title: '📋 Subscription Summary:',
      variant: 'warning',
      content: `
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px;">
          <tr>
            <td style="padding: 4px 0; color: ${emailTokens.colors.slate600};">Restaurant:</td>
            <td style="padding: 4px 0; font-weight: 700; text-align: right; color: ${emailTokens.colors.slate950};">${restaurantName}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: ${emailTokens.colors.slate600};">Current Plan:</td>
            <td style="padding: 4px 0; font-weight: 700; text-align: right; color: ${emailTokens.colors.slate950};">${planName}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: ${emailTokens.colors.slate600};">Expiration Date:</td>
            <td style="padding: 4px 0; font-weight: 700; text-align: right; color: ${emailTokens.colors.amber600};">${expiryDate}</td>
          </tr>
        </table>
      `,
    })}

    <p style="margin-top: 0; margin-bottom: 20px;">
      To ensure uninterrupted POS operation, live table ordering, and analytics tracking for your team, please renew your subscription before the expiration date.
    </p>

    ${renderButton({
      text: 'Renew Subscription Now',
      url: renewUrl,
      variant: 'primary',
    })}

    <p style="font-size: 13px; color: ${emailTokens.colors.slate500}; margin-top: 24px; margin-bottom: 0;">
      <strong>Grace Period Note:</strong> After your expiration date, your account will enter a 48-hour grace period before features are limited.
    </p>
  `;

  const html = renderLayout({
    content,
    preheader: `Action Required: ${restaurantName} subscription expires in ${daysRemaining} days`,
  });

  const text = `
Subscription Renewal Reminder - Restroo

Hi Team at ${restaurantName},

Your ${planName} subscription is scheduled to expire on ${expiryDate} (${daysRemaining} days remaining).

Summary:
- Restaurant: ${restaurantName}
- Current Plan: ${planName}
- Expiration Date: ${expiryDate}

Renew your subscription to prevent service interruption:
${renewUrl}

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
}
