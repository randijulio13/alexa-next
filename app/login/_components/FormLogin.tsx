"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthenticateAction } from "../actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

export interface LoginFormInputs {
  username: string;
  password: string;
  remember: boolean;
}

const FormLogin = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await AuthenticateAction(data);
      if (res.error) {
        setError("username", { message: res.error });
      }

      router.push("/");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while signing in",
      });
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
            <Input
              readOnly={isSubmitting}
              id="username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <span className="text-destructive text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              readOnly={isSubmitting}
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-destructive text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="remember" {...register("remember")} />
            <Label htmlFor="remember">Remember Me</Label>
          </div>
          <div>
            <Button
              disabled={isSubmitting}
              className={cn("w-full", { "bg-primary/80": isSubmitting })}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" /> Loading...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
