import { Router } from "express";
import {
  getShowcaseItems,
  createShowcaseItem,
  deleteShowcaseItem,
} from "../controllers/showcase.controller";

const router = Router();

router.get("/", getShowcaseItems);
router.post("/", createShowcaseItem);
router.delete("/:id", deleteShowcaseItem);

export default router;
