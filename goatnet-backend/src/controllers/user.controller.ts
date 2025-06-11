import { Request, Response } from "express";
import { userService } from "../services/user";

// GET ALL
export const listUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAll();
  return res.json(users);
};

// GET
export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getById(req.params.id);
  return res.json(user);
};

// PATCH
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, imageUrl, link, showOnLanding, landingOrder } = req.body;
    const updated = await userService.update(req.params.id, {
      name,
      imageUrl,
      link,
      showOnLanding,
      landingOrder,
    });
    return res.json(updated);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.delete(req.params.id);
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
