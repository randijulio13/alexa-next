"use server";

import prisma from "@/lib/prisma";
import { generateToken } from "@/lib/utils";
import { BaseActionResponse } from "@/schemas/common";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const Authenticate = async (
  username: string,
  password: string
): BaseActionResponse<User> => {
  const cookieStore = await cookies();
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!user) {
    return { data: {} as User, error: "Invalid username or password" };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return { data: {} as User, error: "Invalid username or password" };
  }

  const token = generateToken(user);

  cookieStore.set("auth_token", token);

  return { data: user, error: null };
};

export const Logout = async (): BaseActionResponse<null> => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  return { data: null, error: null };
};
