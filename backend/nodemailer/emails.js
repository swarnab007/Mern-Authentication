import { mailjetClient } from "./config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplates.js";

export const sendVerifyEmail = async (email, verifyPasswordToken) => {
  try {
    // Replace placeholder {verificationCode} in the template with the actual token
    const emailContent = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verifyPasswordToken);

    const response = await mailjetClient.post("send", { version: "v3.1" }).request({
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
