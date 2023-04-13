import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

console.log("EMAIL_HOST: ", env.EMAIL_HOST);
console.log("EMAIL_PORT: ", env.EMAIL_PORT);
console.log("EMAIL_USER: ", env.EMAIL_USER);
console.log("EMAIL_PASSWORD: ", env.EMAIL_PASSWORD);

export const mailTransporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: +env.EMAIL_PORT,
    secure: false,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD
    }
});
