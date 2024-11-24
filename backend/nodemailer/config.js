import mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config('./.env'); // Load environment variables from your .env file

// Configure the Mailjet client
export const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY, // Mailjet API Key
  process.env.MAILJET_SECRET_KEY // Mailjet API Secret
);
