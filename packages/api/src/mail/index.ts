import env from "@nw/env";
import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: +env.EMAIL_PORT,
    secure: false,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD
    }
});
