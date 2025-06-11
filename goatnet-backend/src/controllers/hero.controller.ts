import { RequestHandler } from "express";
import { heroService } from "../services/hero";

// GET /hero
export const getHero: RequestHandler = async (_req, res) => {
  const hero = await heroService.getHero();
  res.json(hero);
};

// POST /hero (Protected)
export const upsertHero: RequestHandler = async (req, res) => {
  try {
    const { desktopVideoUrl, mobileVideoUrl } = req.body;
    const updated = await heroService.upsertHero(
      desktopVideoUrl,
      mobileVideoUrl
    );
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
