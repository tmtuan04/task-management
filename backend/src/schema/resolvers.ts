import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.userId) {
        throw new Error("Not authenticated");
      }
      const user = await prisma.user.findUnique({
        where: { id: context.userId },
      });
      return user;
    },
  },

  Mutation: {
    signup: async (_parent: any, args: any) => {
      const { email, password, name } = args;

      // 1. Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      // 2. Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      //  3. Create the user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      //   4. Gen Token
      const token = jwt.sign({ userId: user.id }, SECRET_KEY as string, {
        expiresIn: "7d",
      });

      return {
        token,
        user,
      };
    },

    login: async (_parent: any, args: any) => {
      const { email, password } = args;

      // 1. Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error("No user found with this email");
      }

      // 2. Compare password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Incorrect password");
      }

      // 3. Generate JWT token
      const token = jwt.sign({ userId: user.id }, SECRET_KEY as string, {
        expiresIn: "7d",
      });

      return {
        token,
        user,
      };
    },
  },
};