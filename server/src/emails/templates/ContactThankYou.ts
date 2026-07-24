import { renderLayout } from '../components/Layout';
import { emailTokens } from '../styles/tokens';
import { renderCard } from '../components/Card';
import { renderButton } from '../components/Button';

export interface ContactThankYouParams {
  name: string;
}

export function renderContactThankYou(params: ContactThankYouParams): { html: string; text: string } {
  const { name } = params;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      Thank You for Contacting Us
    </h2>

    <p style="margin-top: 0; margin-bottom: 16px;">
      Hello <strong>${name}</strong>,
    </p>

    <p style="margin-top: 0; margin-bottom: 16px;">
      We have successfully received your message. Thank you for reaching out to the Restroo team!
    </p>

    ${renderCard({ 
      variant: 'info', 
      content: 'Our support team is reviewing your inquiry and will get back to you as soon as possible. We typically respond within 24-48 business hours.' 
    })}

    <p style="margin-top: 24px; margin-bottom: 0;">
      If you have any additional information to add, please feel free to reply to this email.
    </p>
  `;

  const html = renderLayout({
    content,
    preheader: `Thank you for contacting Restroo`,
  });

  const text = `
Thank You for Contacting Us

Hello ${name},

We have successfully received your message. Thank you for reaching out to the Restroo team!

Our support team is reviewing your inquiry and will get back to you as soon as possible. We typically respond within 24-48 business hours.

If you have any additional information to add, please feel free to reply to this email.
  `.trim();

  return { html, text };
}
