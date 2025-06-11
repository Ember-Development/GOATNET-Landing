import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "replace-with-secure-secret";

export interface JwtPayload {
  userId: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
