import { Router } from "express";
import { getAbout, upsertAbout } from "../controllers/about.controller";

const router = Router();

router.get("/", getAbout);
router.post("/", upsertAbout);

export default router;
