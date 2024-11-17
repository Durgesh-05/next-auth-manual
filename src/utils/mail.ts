import { createTransport } from 'nodemailer';
import { EmailType } from './types';

interface EmailOptions {
  username: string;
  emailType: EmailType;
  link: string;
  email: string;
}

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD,
  },
});

const generateSimpleHtmlEmail = (
  username: string,
  emailType: EmailType,
  link: string
) => {
  const intro =
    emailType === EmailType.Verify
      ? "Welcome to Next-Auth! We're very excited to have you on board."
      : 'You requested a password reset.';

  const instructions =
    emailType === EmailType.Verify
      ? 'To get started with Next-Auth, please click here:'
      : 'Click the button below to reset your password:';

  const buttonText =
    emailType === EmailType.Verify
      ? 'Verify your account'
      : 'Reset your Password';

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1>Hello, ${username}!</h1>
      <p>${intro}</p>
      <p>${instructions}</p>
      <a href="${link}" style="display: inline-block; padding: 10px 15px; color: #fff; background-color: #22BC66; text-decoration: none; border-radius: 5px;">${buttonText}</a>
      <p>Need help or have questions? Just reply to this email, we'd love to help.</p>
    </div>
  `;
};

const sendEmail = async ({
  username,
  emailType,
  link,
  email,
}: EmailOptions) => {
  try {
    const emailHtml = generateSimpleHtmlEmail(username, emailType, link);

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject:
        emailType === EmailType.Verify
          ? 'Verify your Email'
          : 'Reset Password Request',
      html: emailHtml,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log(
      'Email Sent Successfully. Response: ' +
        mailResponse.response +
        ' | Message ID: ' +
        mailResponse.messageId
    );
  } catch (e: any) {
    console.error('Error sending email: ', e);
  }
};

export { sendEmail };
