import { ResetPassComp } from "../_components/auth-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL: string; token: string }>;
}) {
  // Wait for searchParams to resolve
  const params = await searchParams;

  // Extract the token from searchParams
  const token = params.token;

  // Pass the token string directly to the ResetPassComp component
  return <ResetPassComp token={token} />;
}
