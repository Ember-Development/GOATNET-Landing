import { RequestHandler } from "express";
import { authService } from "../services/auth";

export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await authService.register(email, password, role);
    res.json({ user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await authService._findUserByEmail(email);
    console.log("DEBUG: looked up userRecord =", userRecord);

    const { token, user } = await authService.login(email, password);
    res.json({ token, userId: user.id, role: user.role });
  } catch (err: any) {
    console.log("DEBUG: login error:", err.message);
    res.status(401).json({ error: err.message });
  }
};
