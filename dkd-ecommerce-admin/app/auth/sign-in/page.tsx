import React from "react";
import LoginForm from "@/components/login/LoginForm";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = getServerSession();

  if (session === null) {
    return null;
  }

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div className="w-[500px] bg-white shadow-xl border border-gray-300 rounded-lg mx-2 px-6 py-16 pt-4">
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
