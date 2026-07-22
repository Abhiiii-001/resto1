import { renderLayout } from '../components/Layout';
import { renderButton } from '../components/Button';
import { renderCard } from '../components/Card';
import { emailTokens } from '../styles/tokens';

export interface UserWelcomeParams {
  userName: string;
  loginUrl: string;
}

export function renderUserWelcome(params: UserWelcomeParams): { html: string; text: string } {
  const { userName, loginUrl } = params;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      Welcome to the Team! 👨‍🍳
    </h2>

    <p style="margin-top: 0; margin-bottom: 16px;">
      Hi <strong>${userName || 'Team Member'}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 20px;">
      Great news! Your staff account is ready. You can now log in to access your staff tools and manage restaurant operations.
    </p>

    ${renderCard({
      title: '🛠️ Staff Workspace Capabilities:',
      variant: 'neutral',
      content: `
        <ul style="margin: 8px 0 0 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>Live POS Kitchen Terminal:</strong> View incoming customer table orders and update kitchen preparation status in real time.</li>
          <li><strong>Order Management:</strong> Manage order fulfillment, packaging, and table delivery statuses.</li>
          <li><strong>Menu & Stock Availability:</strong> Toggle item availability and mark out-of-stock product variants.</li>
        </ul>
      `,
    })}

    ${renderButton({
      text: 'Log In to Staff Workspace',
      url: loginUrl,
      variant: 'primary',
    })}

    <p style="font-size: 14px; color: ${emailTokens.colors.slate600}; margin-top: 24px; margin-bottom: 0;">
      If you have questions about your role permissions or shift access, please consult your restaurant administrator.
    </p>
  `;

  const html = renderLayout({
    content,
    preheader: `Welcome to the team! Your employee account is verified`,
  });

  const text = `
Welcome to the Team! - Restroo Staff Workspace

Hi ${userName || 'Team Member'},

Your staff account is verified and ready.

Staff Workspace Capabilities:
• Live POS Kitchen Terminal & Table Order Tracking
• Order Fulfillment & Status Updates
• Menu Item Availability Toggles

Log in to your workspace here:
${loginUrl}

--
Restroo Platform
${emailTokens.company.website}
  `.trim();

  return { html, text };
}
