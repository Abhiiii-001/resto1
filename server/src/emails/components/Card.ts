import { emailTokens } from '../styles/tokens';

export interface RenderCardProps {
  content: string;
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  title?: string;
}

export function renderCard({ content, variant = 'neutral', title }: RenderCardProps): string {
  let borderColor = emailTokens.colors.slate200;
  let accentColor = emailTokens.colors.primary;
  let bgColor = emailTokens.colors.slate50;

  if (variant === 'info') {
    borderColor = emailTokens.colors.slate200;
    accentColor = emailTokens.colors.primary;
    bgColor = emailTokens.colors.slate50;
  } else if (variant === 'success') {
    borderColor = '#a7f3d0';
    accentColor = emailTokens.colors.emerald600;
    bgColor = emailTokens.colors.emerald50;
  } else if (variant === 'warning') {
    borderColor = '#fde68a';
    accentColor = emailTokens.colors.amber600;
    bgColor = emailTokens.colors.amber50;
  } else if (variant === 'danger') {
    borderColor = '#fecdd3';
    accentColor = emailTokens.colors.rose600;
    bgColor = emailTokens.colors.rose50;
  }

  return `
    <div style="background-color: ${bgColor}; border: 1px solid ${borderColor}; border-left: 4px solid ${accentColor}; border-radius: ${emailTokens.borders.radiusMd}; padding: 20px; margin: 24px 0;">
      ${title ? `<div style="font-weight: 700; font-size: 15px; color: ${emailTokens.colors.slate950}; margin-bottom: 8px;">${title}</div>` : ''}
      <div style="font-size: 14px; line-height: 1.6; color: ${emailTokens.colors.slate700};">
        ${content}
      </div>
    </div>
  `;
}

export function renderFallbackLink(url: string): string {
  return `
    <div style="font-size: 12px; line-height: 1.5; color: ${emailTokens.colors.slate500}; margin-top: 28px; padding-top: 20px; border-top: 1px solid ${emailTokens.colors.slate200}; word-break: break-all;">
      If the button above does not work, copy and paste this link into your browser:<br>
      <a href="${url}" style="color: ${emailTokens.colors.primary}; text-decoration: underline;">${url}</a>
    </div>
  `;
}
