import { RequestHandler } from "express";
import { aboutService } from "../services/about";

// GET /about
export const getAboutSection: RequestHandler = async (_req, res) => {
  try {
    const about = await aboutService.getAbout();
    res.json(about);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /about/title
export const updateTitle: RequestHandler = async (req, res) => {
  try {
    const { title } = req.body;
    if (typeof title !== "string") {
      res.status(400).json({ error: "Title must be a string." });
    }
    const updated = await aboutService.updateTitle(title);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /about/youtubeUrl
export const updateYoutubeUrl: RequestHandler = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    if (typeof youtubeUrl !== "string") {
      res.status(400).json({ error: "youtubeUrl must be a string." });
    }
    const updated = await aboutService.updateYoutubeUrl(youtubeUrl);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// POST /about/paragraphs
export const addParagraph: RequestHandler = async (req, res) => {
  try {
    const { text } = req.body;
    if (typeof text !== "string" || !text.trim()) {
      res.status(400).json({ error: "Paragraph text is required." });
    }
    const updated = await aboutService.addParagraph(text);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /about/paragraphs/:index
export const updateParagraph: RequestHandler = async (req, res) => {
  try {
    const index = parseInt(req.params.index, 10);
    const { text } = req.body;

    if (Number.isNaN(index) || index < 0) {
      res.status(400).json({ error: "Invalid paragraph index." });
    }
    if (typeof text !== "string" || !text.trim()) {
      res.status(400).json({ error: "Paragraph text is required." });
    }

    const updated = await aboutService.updateParagraph(index, text);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /about/paragraphs/:index
export const deleteParagraph: RequestHandler = async (req, res) => {
  try {
    const index = parseInt(req.params.index, 10);
    if (Number.isNaN(index) || index < 0) {
      res.status(400).json({ error: "Invalid paragraph index." });
    }

    await aboutService.deleteParagraph(index);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
