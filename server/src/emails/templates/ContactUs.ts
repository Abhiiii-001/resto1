import { renderLayout } from '../components/Layout';
import { emailTokens } from '../styles/tokens';
import { renderCard } from '../components/Card';

export interface ContactUsParams {
  name: string;
  email: string;
  type?: string;
  message: string;
}

export function renderContactUs(
  params: ContactUsParams
): { html: string; text: string } {
  const { name, email, type, message } = params;

  const content = `
    <h2 style="font-size: 20px; font-weight: 700; color: ${emailTokens.colors.slate950}; margin-top: 0; margin-bottom: 12px;">
      New Contact Form Submission
    </h2>

    <p style="margin-top: 0; margin-bottom: 16px;">
      <strong>Name:</strong> ${name}<br/>
      <strong>Email:</strong> ${email}<br/>
      <strong>Type:</strong> ${type ?? 'General'}
    </p>

    <h3 style="font-size: 16px; font-weight: 600; color: ${emailTokens.colors.slate900}; margin-top: 20px; margin-bottom: 8px;">
      Message:
    </h3>

    ${renderCard({
      variant: 'neutral',
      content: `<div style="white-space: pre-wrap;">${message}</div>`,
    })}
  `;

  const html = renderLayout({
    content,
    preheader: `New Contact Submission from ${name}`,
  });

  const text = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Type: ${type ?? 'General'}

Message:
${message}
`.trim();

  return { html, text };
}