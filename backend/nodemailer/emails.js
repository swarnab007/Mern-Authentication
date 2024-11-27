import { mailjetClient } from "./config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailsTemplates.js";

export const sendVerifyEmail = async (email, verifyPasswordToken) => {
  try {
    // Replace placeholder {verificationCode} in the template with the actual token
    const emailContent = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verifyPasswordToken
    );

    const response = await mailjetClient
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "banerjeeswarnab66@gmail.com", // Your verified Mailjet sender email
              Name: "Mern-auth",
            },
            To: [
              {
                Email: email, // Recipient's email
              },
            ],
            Subject: "Verify Your Email",
            HTMLPart: emailContent, // Use the customized email template
          },
        ],
      });

    console.log("Verification email sent successfully:", response.body);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const emailContent = WELCOME_EMAIL_TEMPLATE.replace("{User}", name);
    const response = await mailjetClient
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "banerjeeswarnab66@gmail.com", // Your verified Mailjet sender email
              Name: "Mern-auth",
            },
            To: [
              {
                Email: email, // Recipient's email
              },
            ],
            Subject: "Welcome to Our Community!",
            HTMLPart: emailContent, // Use the customized email template
          },
        ],
      });

    console.log("Welcome email sent successfully:", response.body);
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
  }
};

export const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    const response = await mailjetClient
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "banerjeeswarnab66@gmail.com", // Your verified Mailjet sender email
              Name: "Mern-auth",
            },
            To: [
              {
                Email: email, // Recipient's email
              },
            ],
            Subject: "Reset Your Password",
            HTMLPart: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
              "{resetURL}",
              resetUrl
            ), // Use the customized email template
          },
        ],
      });
    console.log("Reset password email sent successfully:", response.body);
  } catch (error) {
    console.error("Error sending reset password email:", error.message);
  }
};

export const sendPasswordResetSuccessEmail = async (email) => {
  try {
    const response = await mailjetClient
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "banerjeeswarnab66@gmail.com", // Your verified Mailjet sender email
              Name: "Mern-auth",
            },
            To: [
              {
                Email: email, // Recipient's email
              },
            ],
            Subject: "Your Password Has Been Reset",
            HTMLPart: PASSWORD_RESET_SUCCESS_TEMPLATE,
          },
        ],
      });
    console.log("Reset password email sent successfully:", response.body);
  } catch (error) {
    console.error("Error sending password reset success email:", error.message);
  }
};
