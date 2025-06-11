import { Request, Response, RequestHandler } from "express";
import multer from "multer";
import path from "path";

// ─── Storage Setup ───────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

// ─── Image Upload Config ─────────────────────────────────────────────────────
const imageFileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (PNG, JPG, GIF, etc.) are allowed"), false);
  }
};

const imageUpload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ─── Video Upload Config ─────────────────────────────────────────────────────
const videoFileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files (MP4, WebM, etc.) are allowed"), false);
  }
};

const videoUpload = multer({
  storage,
  fileFilter: videoFileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});

// ─── Final Handlers ──────────────────────────────────────────────────────────

const handleImageUpload: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No image uploaded or wrong file type." });
    return;
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
};

const handleVideoUpload: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No video uploaded or wrong file type." });
    return;
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
};
// ─── Exported Middleware Chains ──────────────────────────────────────────────

export const uploadImage = [imageUpload.single("file"), handleImageUpload];
export const uploadVideo = [videoUpload.single("file"), handleVideoUpload];
