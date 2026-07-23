import { BrevoClient } from "@getbrevo/brevo";
import logger from "./logger";

let apiInstance: BrevoClient | null = null;

type MailBody = string | { html: string; text?: string };

const mailSender = async (
  email: string,
  title: string,
  body: MailBody
) => {
  try {
    if (!apiInstance) {
      apiInstance = new BrevoClient({
        apiKey: process.env.BREVO_API_KEY!,
      });
    }

    const htmlContent = typeof body === "string" ? body : body.html;
    const textContent =
      typeof body === "string"
        ? body.replace(/<[^>]*>/g, "")
        : body.text;

    const senderEmail =
      process.env.MAIL_FROM || process.env.MAIL_USER!;

    const response = await apiInstance.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Restroo",
        email: senderEmail,
      },
      to: [
        {
          email,
        },
      ],
      subject: title,
      htmlContent,
      textContent,
    });

    logger.info(`Email successfully sent to ${email} with subject: "${title}"`);

    return response;
  } catch (error: any) {
    logger.error(`❌ mailSender Error sending to ${email}:`, error);
    throw error;
  }
};

export default mailSender;