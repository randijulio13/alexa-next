"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Authenticate } from "../actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LoginFormInputs {
  username: string;
  password: string;
}

const FormLogin = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await Authenticate(data.username, data.password);
      if (res.error) {
        setError("username", { message: res.error });
        setIsSubmitting(false);
      }

      router.push("/");
    } catch (err) {
      setIsSubmitting(false);
      console.error(err);
    }
  };

  return (
    <div className="bg-primary-foreground h-screen p-4 flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center h-full w-screen sm:w-96">
        <h1 className="text-6xl font-cursive">Alexa</h1>
        <span className="my-4 tracking-widest">Welcome to Alexa</span>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="remember" name="remember" />
            <Label htmlFor="remember">Remember Me</Label>
          </div>
          <div>
            <Button
              disabled={isSubmitting}
              className={cn({ "bg-primary/80": isSubmitting })}
            >
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
