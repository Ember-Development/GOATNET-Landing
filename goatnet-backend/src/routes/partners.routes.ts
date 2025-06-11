import { Router } from "express";
import {
  getPartners,
  createPartner,
  deletePartner,
} from "../controllers/partners.controller";

const router = Router();

router.get("/", getPartners);
router.post("/", createPartner);
router.delete("/:id", deletePartner);

export default router;
