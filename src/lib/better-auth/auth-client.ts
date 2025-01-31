import { createAuthClient } from "better-auth/react";

import { BASE_URL } from "../constants/env";
export const authClient = createAuthClient({
  baseURL: BASE_URL,
});

export const { useSession, forgetPassword, changePassword } = authClient;
