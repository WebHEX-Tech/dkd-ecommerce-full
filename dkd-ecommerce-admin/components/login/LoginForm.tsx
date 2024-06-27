"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username has to be filled.",
    })
    .max(60, {
      message: "Password can't be longer than 60 characters.",
    }),
  password: z
    .string()
    .min(6, { message: "Password has to be at least 6 characters long." }),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    console.log("Sign-in response:", response);

    if (!response?.error) {
      toast.dismiss();
      toast.success("Successfully signed in!");
      router.push("/dashboard");
    } else {
      toast.dismiss();
      toast.error("Wrong Credentials!");
    }
  }

  return (
    <Form {...form}>
      <div className="my-5">
        <div className="flex-shrink-0 flex justify-center">
          <Image src="/standalone-logo.png" alt="logo" height={120} width={150} priority />
        </div>
        <h1 className="text-[20px] font-semibold">Login</h1>
        <p className=" font-light mt-0">
          to continue to Admin - DKD Marketing{" "}
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage className="text-red-500"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500"/>
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
