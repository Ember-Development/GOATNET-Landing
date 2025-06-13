"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// ─── Storage Setup ───────────────────────────────────────────────────────────
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../uploads/"));
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const base = path_1.default.basename(file.originalname, ext);
        cb(null, `${base}-${Date.now()}${ext}`);
    },
});
// ─── Image Upload Config ─────────────────────────────────────────────────────
const imageFileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files (PNG, JPG, GIF, etc.) are allowed"));
    }
};
const imageUpload = (0, multer_1.default)({
    storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});
// ─── Video Upload Config ─────────────────────────────────────────────────────
const videoFileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only video files (MP4, WebM, etc.) are allowed"));
    }
};
const videoUpload = (0, multer_1.default)({
    storage,
    fileFilter: videoFileFilter,
    limits: { fileSize: 100 * 1024 * 1024 },
});
// ─── Final Handlers ──────────────────────────────────────────────────────────
const handleImageUpload = (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No image uploaded or wrong file type." });
        return;
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
};
const handleVideoUpload = (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No video uploaded or wrong file type." });
        return;
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
};
// ─── Exported Middleware Chains ──────────────────────────────────────────────
exports.uploadImage = [imageUpload.single("file"), handleImageUpload];
exports.uploadVideo = [videoUpload.single("file"), handleVideoUpload];
