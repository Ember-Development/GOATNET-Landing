import { RequestHandler } from "express";
import { credentialService } from "../services/member";

// GET /credential/credentials
export const getLandingCredentials: RequestHandler = async (_req, res) => {
  try {
    const creds = await credentialService.getAllLandingCredentials();
    res.json(creds);
  } catch (err: any) {
    console.error("Error fetching credentials:", err);
    res.status(500).json({ error: "Failed to fetch credentials" });
  }
};

// POST /credential/credentials
export const createCredential: RequestHandler = async (req, res) => {
  try {
    const { name, link, landingOrder } = req.body;
    let imageUrl: string | undefined = undefined;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    if (!name || !landingOrder) {
      res.status(400).json({ error: "Name and landingOrder are required" });
    }

    const newCred = await credentialService.createLandingCredential({
      name,
      link,
      imageUrl,
      landingOrder: Number(landingOrder),
    });

    res.status(201).json(newCred);
  } catch (err: any) {
    console.error("Error creating credential:", err);
    res.status(400).json({ error: err.message });
  }
};

// PUT /credential/credentials/:id
export const updateCredential: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, link, landingOrder } = req.body;
    let imageUrl: string | undefined = undefined;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    if (!name || !landingOrder) {
      res.status(400).json({ error: "Name and landingOrder are required" });
    }

    const updated = await credentialService.updateLandingCredential({
      id,
      name,
      link,
      imageUrl,
      landingOrder: Number(landingOrder),
    });

    res.json(updated);
  } catch (err: any) {
    console.error("Error updating credential:", err);
    res.status(400).json({ error: err.message });
  }
};

// DELETE /credential/credentials/:id
export const deleteCredential: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await credentialService.deleteLandingCredential(id);
    res.json({ success: true });
  } catch (err: any) {
    console.error("Error deleting credential:", err);
    res.status(400).json({ error: err.message });
  }
};
