import { renderLayout } from '../components/Layout';
import { renderButton } from '../components/Button';
import { renderCard } from '../components/Card';
import { emailTokens } from '../styles/tokens';

export interface RestaurantWelcomeParams {
  restaurantName: string;
  ownerName?: string;
  dashboardUrl: string;
}

export function renderRestaurantWelcome(params: RestaurantWelcomeParams): { html: string; text: string } {
  const { restaurantName, ownerName, dashboardUrl } = params;

  const content = `
    <div style="background-color: ${emailTokens.colors.emerald50}; border: 1px solid #a7f3d0; border-radius: ${emailTokens.borders.radiusLg}; padding: 20px; margin-bottom: 24px; text-align: center;">
      <span style="font-size: 24px;">🎉</span>
      <h2 style="font-size: 18px; font-weight: 700; color: ${emailTokens.colors.emerald600}; margin: 8px 0 4px 0;">
        Your Restaurant is Ready!
      </h2>
      <p style="font-size: 13px; color: ${emailTokens.colors.slate700}; margin: 0;">
        Account email verified successfully for <strong>${restaurantName}</strong>
      </p>
    </div>

    <p style="margin-top: 0; margin-bottom: 16px;">
      Hi <strong>${ownerName || 'Restaurant Owner'}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 20px;">
      Congratulations! Your restaurant workspace for <strong>${restaurantName}</strong> is fully activated and ready. You can now start configuring your digital menu, setting up QR table ordering, and inviting staff members.
    </p>

    ${renderCard({
      title: '⚡ Feature Highlights to Get You Started:',
      variant: 'info',
      content: `
        <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>QR Table Menus & Ordering:</strong> Generate instant table QR codes for direct customer ordering.</li>
          <li><strong>Live Kitchen POS & Orders:</strong> Real-time order status tracking from placement to fulfillment.</li>
          <li><strong>Staff Management:</strong> Assign employee roles, manage verification, and track staff shifts.</li>
          <li><strong>Sales Analytics:</strong> Daily, weekly, and monthly automated revenue summaries.</li>
        </ul>
      `,
    })}

    ${renderButton({
      text: 'Go to Restaurant Dashboard',
      url: dashboardUrl,
      variant: 'primary',
    })}

    <p style="font-size: 14px; color: ${emailTokens.colors.slate600}; margin-top: 24px; margin-bottom: 0;">
      Need help setting up your menu or payment gateway? Check out our online guides or reply directly to this email to talk to an onboarding specialist.
    </p>
  `;

  const html = renderLayout({
    content,
    preheader: `${restaurantName} is now ready on Restroo! Go to your dashboard`,
  });

  const text = `
Your Restaurant is Ready! - Restroo

Hi ${ownerName || 'Restaurant Owner'},

Congratulations! Your restaurant workspace for ${restaurantName} is fully activated and ready.

Feature Highlights:
• QR Table Menus & Ordering
• Live Kitchen POS & Orders
• Staff Management & Roles
• Sales Analytics & Reports

Access your dashboard here:
${dashboardUrl}

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
}
