import nodemailer from "nodemailer";
import {
  MAIL_HOST,
  MAIL_PASS,
  MAIL_PORT,
  MAIL_SERVICE,
  MAIL_USER,
} from "@/lib/constants/env";

const transporter = nodemailer.createTransport({
  service: MAIL_SERVICE,
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
} as nodemailer.TransportOptions);

export default transporter;
