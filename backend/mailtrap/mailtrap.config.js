import { MailtrapClient } from "mailtrap"
import dotenv from "dotenv"

dotenv.config('./.env');

// console.log(process.env.MAILTRAP_TOKEN);

export const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Swarnab Banerjee",
};
