import jwt from "jsonwebtoken";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

export const authContext = async ({ req }: { req: Request }) => {
  const authHeader = req.headers.authorization || "";
  let token = "";

  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  if (!token) return {};

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
      userId: string;
    };
    return { userId: decoded.userId };
  } catch (error) {
    const err = error as Error;
    console.error("Token verification failed:", err.message);
    return {};
  }
};
