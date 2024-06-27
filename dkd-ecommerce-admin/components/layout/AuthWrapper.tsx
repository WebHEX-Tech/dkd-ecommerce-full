"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    } else if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  return <>{children}</>;
};

export default AuthWrapper;
