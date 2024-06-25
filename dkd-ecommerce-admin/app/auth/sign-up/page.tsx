import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/authOptions";
import RegisterForm from "@/components/register/RegisterForm";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return null;
  }

  return (
    <section className="container h-screen flex items-center justify-center">
      <div className="w-[500px] bg-white shadow-xl border border-gray-300 rounded-lg mx-2 px-6 py-16 pt-4">
        <RegisterForm />
      </div>
    </section>
  );
};

export default page;
