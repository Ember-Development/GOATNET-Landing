import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

// Public Auth endpoints
router.post("/api/auth/register", register);
router.post("/api/auth/login", login);

export default router;
