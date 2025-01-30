import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { SENDER_EMAIL } from "@/lib/constants/env";
import { resend } from "@/lib/resend";
import logger from "@/lib/logger";
import argon2 from "argon2";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    password: {
      hash: async (password) => {
        return await argon2.hash(password);
      },
      verify: async ({ password, hash }) => {
        return await argon2.verify(hash, password);
      },
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });

      if (error) {
        console.log("Email error: ", error);
      }
    },
  },

  plugins: [nextCookies()],
  logger: {
    log: (level, message, ...args) => {
      switch (level) {
        case "info":
          logger.info(message, ...args);
          break;
        case "warn":
          logger.warn(message, ...args);
          break;
        case "error":
          logger.error(message, ...args);
          break;
        case "debug":
          logger.debug(message, ...args);
          break;
        default:
          logger.info(message, ...args);
          break;
      }
    },
  },
});
