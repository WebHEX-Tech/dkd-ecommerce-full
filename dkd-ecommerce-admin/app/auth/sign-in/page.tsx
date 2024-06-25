import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/authOptions";
import LoginForm from "@/components/login/LoginForm";
import { redirect, useRouter } from "next/navigation";

const page = async () => {
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div className="w-[500px] bg-white shadow-xl border border-gray-300 rounded-lg mx-2 px-6 py-16 pt-4">
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
