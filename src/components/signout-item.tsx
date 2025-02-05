"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth/auth-client";
import { LogOut } from "lucide-react";

function SignOutItem() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
    }
  };

  return (
    <DropdownMenuItem
      onClick={async () => handleSignOut()}
      className="cursor-pointer"
    >
      <LogOut />
      Sign Out
    </DropdownMenuItem>
  );
}

export default SignOutItem;
