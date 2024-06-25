import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });

      document.cookie = `__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return <button className="text-left flex gap-4 px-10 py-2 text-body-medium" onClick={handleSignOut}>Logout</button>;
};

export default LogoutButton;
