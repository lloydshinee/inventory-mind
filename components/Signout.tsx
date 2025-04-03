"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center gap-2" onClick={handleSignOut}>
      <LogOutIcon size={18} />
      Signout
    </div>
  );
};

export { SignOut };
