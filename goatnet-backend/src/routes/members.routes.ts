import { Router } from "express";
import {
  getMembers,
  createMember,
  deleteMember,
} from "../controllers/member.controller";

const router = Router();

router.get("/", getMembers);
router.post("/", createMember);
router.delete("/:id", deleteMember);

export default router;
