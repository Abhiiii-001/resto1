import { renderLayout } from '../components/Layout';
import { emailTokens } from '../styles/tokens';

export interface RestaurantApprovalParams {
  restaurantName: string;
  email: string;
}

export function renderRestuarantApproval(
  params: RestaurantApprovalParams
): { html: string; text: string } {
  const { restaurantName, email } = params;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      New Contact Form Submission
    </h2>

    <p style="margin-top: 0; margin-bottom: 16px;">
      <strong>Name:</strong> ${restaurantName}<br/>
      <strong>Email:</strong> ${email}<br/>
    </p>
  `;

  const html = renderLayout({
    content,
    preheader: `New Contact Submission from ${restaurantName}`,
  });

  const text = `
New Contact Form Submission

Name: ${restaurantName}
Email: ${email}
`.trim();

  return { html, text };
}