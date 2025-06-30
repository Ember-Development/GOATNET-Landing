import { RequestHandler } from "express";
import { newsletterService } from "../services/newsletter";

export const Subscribe: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    await newsletterService.subscribe(email);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
