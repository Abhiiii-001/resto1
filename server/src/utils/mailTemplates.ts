export const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f8f8f7;
            margin: 0;
            padding: 0;
            color: #323232;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header {
            background-color: #C8161D;
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 1px;
        }
        .content {
            padding: 40px 30px;
            line-height: 1.6;
        }
        .content h2 {
            color: #C8161D;
            font-size: 22px;
            margin-top: 0;
        }
        .button {
            display: inline-block;
            background-color: #C8161D;
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
            font-size: 16px;
        }
        .footer {
            background-color: #f8f8f7;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #959595;
            border-top: 1px solid #eeeeee;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>RESTRO</h1>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Restro. All rights reserved.</p>
            <p>Your online hero for restaurant management.</p>
        </div>
    </div>
</body>
</html>
`;

export const welcomeEmailTemplate = (name: string, role: 'Restaurant' | 'User') => {
    const roleMessage = role === 'Restaurant' 
        ? "We're thrilled to have your restaurant on board. Restro is designed to streamline your operations, enhance customer experience, and help your business grow."
        : "Welcome to the team! You have successfully signed up. Please note that your account is currently in a waiting period. You will be able to log in once your restaurant administrator verifies your account.";

    const content = `
        <h2>Welcome to Restro, ${name || 'there'}! 🎉</h2>
        <p>Thank you for joining our platform. ${roleMessage}</p>
        <p>If you have any questions or need assistance getting started, our support team is always here to help.</p>
        <p>Best regards,<br>The Restro Team</p>
    `;
    return baseTemplate(content);
}

export const employeeVerifiedTemplate = (name: string, loginLink: string) => {
    const content = `
        <h2>You're Verified, ${name || 'there'}! ✅</h2>
        <p>Great news! Your restaurant administrator has verified your employee account.</p>
        <p>You can now log in to the Restro platform and start managing operations.</p>
        <div style="text-align: center;">
            <a href="${loginLink}" class="button">Log In Now</a>
        </div>
        <p style="font-size: 14px; color: #646464; margin-top: 30px;">
            If the button doesn't work, copy and paste the following link into your browser:<br>
            <a href="${loginLink}" style="color: #C8161D; word-break: break-all;">${loginLink}</a>
        </p>
    `;
    return baseTemplate(content);
}

export const verificationEmailTemplate = (link: string, title: string, message: string) => {
    const content = `
        <h2>${title}</h2>
        <p>${message}</p>
        <div style="text-align: center;">
            <a href="${link}" class="button">Verify Email</a>
        </div>
        <p style="font-size: 14px; color: #646464; margin-top: 30px;">
            If the button doesn't work, copy and paste the following link into your browser:<br>
            <a href="${link}" style="color: #C8161D; word-break: break-all;">${link}</a>
        </p>
    `;
    return baseTemplate(content);
}

export const resetPasswordEmailTemplate = (link: string) => {
    const content = `
        <h2>Password Reset Request</h2>
        <p>We received a request to reset the password for your Restro account. If you made this request, please click the button below to choose a new password.</p>
        <div style="text-align: center;">
            <a href="${link}" class="button">Reset Password</a>
        </div>
        <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        <p style="font-size: 14px; color: #646464; margin-top: 30px;">
            If the button doesn't work, copy and paste the following link into your browser:<br>
            <a href="${link}" style="color: #C8161D; word-break: break-all;">${link}</a>
        </p>
    `;
    return baseTemplate(content);
}
