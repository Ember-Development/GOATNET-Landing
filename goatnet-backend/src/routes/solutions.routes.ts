import { Router } from "express";
import { getTabs, upsertTab } from "../controllers/solutions.controller";

const router = Router();

router.get("/", getTabs);
router.post("/", upsertTab);

export default router;
