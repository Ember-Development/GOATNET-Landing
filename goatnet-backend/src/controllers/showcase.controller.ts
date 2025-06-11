import { RequestHandler } from "express";
import { attractionService } from "../services/showcase";

// GET /showcase
export const getAllShowcaseItems: RequestHandler = async (_req, res) => {
  try {
    const items = await attractionService.getAllShowcase();
    res.json(items);
  } catch (err: any) {
    console.error("Error fetching showcase items:", err);
    res.status(500).json({ error: "Unable to fetch showcase items" });
  }
};

// POST /showcase
export const createShowcaseItem: RequestHandler = async (req, res) => {
  try {
    const {
      title,
      caption,
      imageUrl,
      videoUrl,
      type,
      channels,
      showOnLanding,
      landingOrder,
    } = req.body;

    const newItem = await attractionService.createAttraction(
      title,
      caption,
      imageUrl,
      videoUrl,
      type,
      channels,
      showOnLanding === true,
      landingOrder
    );

    res.json(newItem);
  } catch (err: any) {
    console.error("Error creating attraction:", err);
    res.status(400).json({ error: err.message });
  }
};

// PUT /showcase/:id
export const updateShowcaseItem: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      caption,
      imageUrl,
      videoUrl,
      type,
      channels,
      showOnLanding,
      landingOrder,
    } = req.body;

    const updatedItem = await attractionService.updateAttraction(
      id,
      title,
      caption,
      imageUrl,
      videoUrl,
      type,
      channels,
      showOnLanding === true,
      landingOrder
    );

    res.json(updatedItem);
  } catch (err: any) {
    console.error("Error updating attraction:", err);
    res.status(400).json({ error: err.message });
  }
};

// DELETE /showcase/:id
export const deleteShowcaseItem: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    await attractionService.deleteAttraction(id);
    res.json({ success: true });
  } catch (err: any) {
    console.error("Error deleting attraction:", err);
    res.status(400).json({ error: err.message });
  }
};
