import { User } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/schemas/common";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateToken(user: User, expiresIn: number): string {
  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign(
    { username: user.username, name: user.name },
    String(jwtSecret),
    { expiresIn }
  );

  return token;
}

export function decodeToken(token: string): JWTPayload {
  const jwtSecret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, String(jwtSecret)) as JWTPayload;

  return decoded;
}
