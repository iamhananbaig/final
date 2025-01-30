import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import nodemailer from "nodemailer";
import { SENDER_EMAIL, SENDER_PASSWORD } from "@/lib/constants/env";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Change this if using a different email provider
  host: "smtp.gmail.com",
  port: 465, // Use 465 for SSL or 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    type: "login", // default
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const urlToUpdate = new URL(url);
        urlToUpdate.searchParams.set("callbackURL", "/dashboard");
        await transporter.sendMail({
          from: SENDER_EMAIL,
          subject: "Email Verification",
          to: user.email,
          html: `Your Email verification Link: ${urlToUpdate.toString()}`,
        });
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    },
  },
  plugins: [nextCookies()],
});
