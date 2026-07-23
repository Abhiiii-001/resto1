import nodemailer from 'nodemailer';
import logger from './logger';

export type MailBody = string | { html: string; text?: string };

const mailSender = async (email: string, title: string, body: MailBody) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.MAIL_PORT || '587', 10),
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const htmlContent = typeof body === 'string' ? body : body.html;
    const textContent = typeof body === 'string' ? undefined : body.text;

    const fromAddress = process.env.MAIL_FROM || process.env.MAIL_USER || 'no-reply@restroo.com';

    const info = await transporter.sendMail({
      from: `"Restroo" <${fromAddress}>`,
      to: email,
      subject: title,
      html: htmlContent,
      text: textContent,
    });

    logger.info(`Email successfully sent to ${email} with subject: "${title}"`);
    return info;
  } catch (error: any) {
    logger.error(`❌ mailSender Error sending to ${email}:`, error);
    throw error;
  }
};

export default mailSender;
