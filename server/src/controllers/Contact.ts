import { Request, Response } from "express";
import mailSender from "../utils/mailSender";
import logger from "../utils/logger";
import { renderContactUs, renderContactThankYou } from "../emails";

export const ContactUs = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, message, type } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required." });
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.MAIL_USER || "admin@restro.com";
    const title = `New Contact Us Submission: ${type || 'General'} from ${name}`;
    
    const body = renderContactUs({ name, email, type, message });
    await mailSender(adminEmail, title, body);

    // Send thank you email to the user
    const thankYouTitle = `Thank you for contacting Restroo`;
    const thankYouBody = renderContactThankYou({ name });
    await mailSender(email, thankYouTitle, thankYouBody);

    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    logger.error("Error in ContactUs controller: ", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
