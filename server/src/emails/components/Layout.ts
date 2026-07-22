import { emailTokens } from '../styles/tokens';

export interface RenderLayoutProps {
  content: string;
  preheader?: string;
}

export function renderLayout({ content, preheader = 'Restroo Platform Notification' }: RenderLayoutProps): string {
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${emailTokens.company.name}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style type="text/css">
    table { border-collapse: collapse; }
    td, th { font-family: sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: ${emailTokens.colors.slate50} !important;
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
      font-family: ${emailTokens.typography.fontFamily};
      color: ${emailTokens.colors.slate950};
    }
    img {
      border: 0 !important;
      outline: none !important;
      text-decoration: none !important;
    }
    a {
      color: ${emailTokens.colors.primary};
    }
    .preheader {
      display: none !important;
      font-size: 1px !important;
      line-height: 1px !important;
      max-height: 0px !important;
      max-width: 0px !important;
      opacity: 0 !important;
      overflow: hidden !important;
      mso-hide: all !important;
    }
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        margin: 0 auto !important;
        border-radius: 0 !important;
        border: none !important;
      }
      .content-padding {
        padding: 28px 20px !important;
      }
      .header-padding {
        padding: 32px 20px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${emailTokens.colors.slate50};">
  <!-- Preheader text for inbox preview -->
  <span class="preheader">${preheader}</span>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${emailTokens.colors.slate50}; padding: 40px 0;">
    <tr>
      <td align="center">
        <!--[if mso]>
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" class="email-container" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: ${emailTokens.colors.white}; border-radius: ${emailTokens.borders.radiusXl}; border: ${emailTokens.borders.borderLight}; box-shadow: ${emailTokens.shadows.card}; overflow: hidden;">
          
          <!-- Header Banner -->
          <tr>
            <td class="header-padding" align="center" style="background-color: ${emailTokens.colors.slate950}; padding: 36px 32px; border-bottom: 3px solid ${emailTokens.colors.primary};">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <!-- Brand Logo -->
                    <span style="font-size: 26px; font-weight: 800; color: ${emailTokens.colors.white}; letter-spacing: -0.5px; font-family: ${emailTokens.typography.fontFamily};">
                      RESTRO<span style="color: ${emailTokens.colors.primary};">.</span>
                    </span>
                    <br>
                    <!-- Brand Subtitle / Badge -->
                    <span style="display: inline-block; margin-top: 6px; font-size: 11px; font-weight: 700; color: ${emailTokens.colors.slate400}; text-transform: uppercase; letter-spacing: 1px;">
                      ${emailTokens.company.tagline}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td class="content-padding" style="padding: 40px 36px; background-color: ${emailTokens.colors.white}; font-family: ${emailTokens.typography.fontFamily}; font-size: 15px; line-height: 1.6; color: ${emailTokens.colors.slate700};">
              ${content}
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 0 36px 32px 36px; background-color: ${emailTokens.colors.white};">
              <div style="background-color: ${emailTokens.colors.slate50}; border: 1px dashed ${emailTokens.colors.slate200}; border-radius: ${emailTokens.borders.radiusMd}; padding: 16px 20px; text-align: center;">
                <span style="font-size: 13px; font-weight: 600; color: ${emailTokens.colors.slate800};">Need assistance?</span>
                <span style="font-size: 13px; color: ${emailTokens.colors.slate500};"> Our team is here to help 24/7. Reach out to </span>
                <a href="mailto:${emailTokens.company.supportEmail}" style="font-size: 13px; font-weight: 600; color: ${emailTokens.colors.primary}; text-decoration: none;">${emailTokens.company.supportEmail}</a>.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${emailTokens.colors.slate50}; padding: 28px 36px; text-align: center; font-family: ${emailTokens.typography.fontFamily}; font-size: 12px; color: ${emailTokens.colors.slate500}; border-top: ${emailTokens.borders.borderLight};">
              <div style="margin-bottom: 12px;">
                <a href="${emailTokens.company.website}" style="color: ${emailTokens.colors.slate600}; text-decoration: none; font-weight: 500; margin: 0 8px;">Website</a> &bull;
                <a href="${emailTokens.company.website}/dashboard" style="color: ${emailTokens.colors.slate600}; text-decoration: none; font-weight: 500; margin: 0 8px;">Dashboard</a> &bull;
                <a href="${emailTokens.company.website}/privacy" style="color: ${emailTokens.colors.slate600}; text-decoration: none; font-weight: 500; margin: 0 8px;">Privacy Policy</a> &bull;
                <a href="${emailTokens.company.website}/terms" style="color: ${emailTokens.colors.slate600}; text-decoration: none; font-weight: 500; margin: 0 8px;">Terms of Service</a>
              </div>
              <p style="margin: 4px 0; color: ${emailTokens.colors.slate500};">&copy; ${currentYear} ${emailTokens.company.fullName}. All rights reserved.</p>
              <p style="margin: 4px 0; font-size: 11px; color: ${emailTokens.colors.slate400};">${emailTokens.company.address}</p>
            </td>
          </tr>

        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
