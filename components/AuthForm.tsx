"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn, signUp } from "@/lib/actions/users.action";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const formSchema = authFormSchema(type);
  // console.log(authFormSchema("sign-in"));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Sign up with Appwrite
      if (type === "sign-up") {
        const userData = {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
        router.push("/sign-in");
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) {
          toast.success("Login successfull!!");
          router.push("/");
        } else {
          toast.error(
            "Invalid credentials. Please check the email and password."
          );
          console.error(
            "Invalid credentials. Please check the email and password."
          ); // Log invalid credentials
        }
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex flex-col flex-center w-full min-h-screen p-4">
      <header className="w-full max-w-96">
        <ToastContainer position="top-center" />
        <div className="flex items-center mb-8">
          <Image
            src={"./icons/logo.svg"}
            alt="ComfyFurniture Logo"
            width={50}
            height={50}
            // className="w-auto h-auto"
          />
          <h1 className="font-bold text-2xl">ComfyFurniture</h1>
        </div>
        <div className="mb-4">
          <div className="text-2xl font-semibold capitalize">
            {type === "sign-in" ? "sign in" : "sign up"}
          </div>
          <p className="text-gray-600">please enter your details</p>
        </div>
      </header>

      {/* form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-96"
        >
          <CustomInput
            name="email"
            placeholder="Enter your email"
            label="Email"
            control={form.control}
          />
          <CustomInput
            name="password"
            placeholder="Enter your password"
            label="Password"
            control={form.control}
          />
          {type === "sign-up" && (
            <>
              <CustomInput
                name="confirmPassword"
                placeholder="Confirm password"
                label="Confirm Password"
                control={form.control}
              />
            </>
          )}
          <Button
            type="submit"
            className="w-full text-white capitalize text-xl rounded-lg hover:bg-secondary hover:text-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : type === "sign-in" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>

      <footer className="mt-4 flex items-center gap-2">
        <p className="text-gray-500 text-sm">
          {type === "sign-in"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <Link
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          className="text-sm text-primary"
        >
          {type === "sign-in" ? "Sign up" : "Sign in"}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
