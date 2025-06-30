import { RequestHandler } from "express";
import { solutionService } from "../services/solutions";

// GET /solutions
export const getAllTabs: RequestHandler = async (_req, res) => {
  const tabs = await solutionService.getAllTabs();
  res.json(tabs);
};

// POST /solutions/tabs
export const createTab: RequestHandler = async (req, res) => {
  try {
    const { name, tagline } = req.body;
    const tab = await solutionService.createTab(name, tagline);
    res.json(tab);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /solutions/tabs/:id
export const updateTab: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, tagline } = req.body;
    const tab = await solutionService.updateTab(id, name, tagline);
    res.json(tab);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /solutions/tabs/:id
export const deleteTab: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await solutionService.deleteTab(id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// POST /solutions/tabs/:tabId/items
export const createItem: RequestHandler = async (req, res) => {
  try {
    const tabId = parseInt(req.params.tabId);
    const { title, tag, description } = req.body;
    const item = await solutionService.createItem(
      tabId,
      title,
      tag,
      description
    );
    res.json(item);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /solutions/items/:itemId
export const updateItem: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.itemId);
    const { title, tag, description } = req.body;
    const item = await solutionService.updateItem(id, title, tag, description);
    res.json(item);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /solutions/items/:itemId
export const deleteItem: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.itemId);
    await solutionService.deleteItem(id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
