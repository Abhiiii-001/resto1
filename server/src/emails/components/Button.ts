import { emailTokens } from '../styles/tokens';

export interface RenderButtonProps {
  text: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function renderButton({ text, url, variant = 'primary' }: RenderButtonProps): string {
  let bgColor = emailTokens.colors.primary;
  let textColor = emailTokens.colors.primaryForeground;
  let shadow = emailTokens.shadows.button;

  if (variant === 'secondary') {
    bgColor = emailTokens.colors.slate100;
    textColor = emailTokens.colors.slate800;
    shadow = 'none';
  } else if (variant === 'danger') {
    bgColor = emailTokens.colors.rose600;
    textColor = emailTokens.colors.white;
    shadow = '0 4px 12px rgba(225, 29, 72, 0.25)';
  }

  return `
    <div style="text-align: center; margin: 32px 0;">
      <!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="18%" stroke="f" fillcolor="${bgColor}">
        <w:anchorlock/>
        <center style="color:${textColor};font-family:sans-serif;font-size:15px;font-weight:bold;">${text}</center>
      </v:roundrect>
      <![endif]-->
      <!--[if !mso]><!-->
      <a href="${url}" target="_blank" style="display: inline-block; background-color: ${bgColor}; color: ${textColor} !important; text-decoration: none; padding: 14px 32px; border-radius: ${emailTokens.borders.radiusMd}; font-weight: 700; font-size: 15px; font-family: ${emailTokens.typography.fontFamily}; box-shadow: ${shadow}; border: 1px solid ${bgColor};">${text}</a>
      <!--<![endif]-->
    </div>
  `;
}
