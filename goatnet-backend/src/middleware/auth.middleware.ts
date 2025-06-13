import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";

// Extend Express Request to include `user`
export interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// Authenticate Middleware (Sync Style)
export const authenticate: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authorization required" });
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token); // assumed to be sync
    (req as AuthRequest).user = { userId: payload.userId, role: payload.role };
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
};

// Authorize Middleware (no change needed)
export function authorize(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
}
