import { VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplates.js";
import { client, sender } from "./mailtrap.config.js";

export const verifyEmail = async (email, verifyPasswordToken) => {
  // console.log("Sending verification email to", email);
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verifyPasswordToken
      ),
      category: "verification email",
    });
    console.log("Verify Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error.message);
  }
};
