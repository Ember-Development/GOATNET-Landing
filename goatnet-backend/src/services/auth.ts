import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";
import prisma from "../../prisma/client";

export const authService = {
  _findUserByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  register: async (
    email: string,
    password: string,
    role: string = "VIEWER"
  ) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role: role as "ADMIN" | "EDITOR" | "VIEWER",
      },
    });
    return user;
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = signToken({ userId: user.id, role: user.role });
    return { token, user };
  },
};
