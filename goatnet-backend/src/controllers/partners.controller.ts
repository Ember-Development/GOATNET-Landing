import { RequestHandler } from "express";
import { partnerService } from "../services/partner";

// GET /partners
export const getAllPartners: RequestHandler = async (_req, res) => {
  const partners = await partnerService.getAll();
  res.json(partners);
};

// POST /partners
export const createPartner: RequestHandler = async (req, res) => {
  try {
    const { name, imageUrl, link, order } = req.body;
    const partner = await partnerService.create(name, imageUrl, link, order);
    res.json(partner);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /partners/:id
export const updatePartner: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, imageUrl, link, order } = req.body;
    const partner = await partnerService.update(
      id,
      name,
      imageUrl,
      link,
      order
    );
    res.json(partner);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /partners/:id
export const deletePartner: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    await partnerService.delete(id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
