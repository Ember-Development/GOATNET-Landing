import { Router } from "express";
import * as heroController from "../controllers/hero.controller";

const router = Router();

router.get("/", heroController.getHero);
router.post("/", heroController.createOrUpdateHero);

export default router;
