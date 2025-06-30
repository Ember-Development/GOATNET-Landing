"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteParagraph = exports.updateParagraph = exports.addParagraph = exports.updateYoutubeUrl = exports.updateTitle = exports.getAboutSection = void 0;
const about_1 = require("../services/about");
// GET /about
const getAboutSection = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const about = yield about_1.aboutService.getAbout();
        res.json(about);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getAboutSection = getAboutSection;
// PATCH /about/title
const updateTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        if (typeof title !== "string") {
            res.status(400).json({ error: "Title must be a string." });
        }
        const updated = yield about_1.aboutService.updateTitle(title);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updateTitle = updateTitle;
// PATCH /about/youtubeUrl
const updateYoutubeUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { youtubeUrl } = req.body;
        if (typeof youtubeUrl !== "string") {
            res.status(400).json({ error: "youtubeUrl must be a string." });
        }
        const updated = yield about_1.aboutService.updateYoutubeUrl(youtubeUrl);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updateYoutubeUrl = updateYoutubeUrl;
// POST /about/paragraphs
const addParagraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (typeof text !== "string" || !text.trim()) {
            res.status(400).json({ error: "Paragraph text is required." });
        }
        const updated = yield about_1.aboutService.addParagraph(text);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.addParagraph = addParagraph;
// PATCH /about/paragraphs/:index
const updateParagraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.params.index, 10);
        const { text } = req.body;
        if (Number.isNaN(index) || index < 0) {
            res.status(400).json({ error: "Invalid paragraph index." });
        }
        if (typeof text !== "string" || !text.trim()) {
            res.status(400).json({ error: "Paragraph text is required." });
        }
        const updated = yield about_1.aboutService.updateParagraph(index, text);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updateParagraph = updateParagraph;
// DELETE /about/paragraphs/:index
const deleteParagraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.params.index, 10);
        if (Number.isNaN(index) || index < 0) {
            res.status(400).json({ error: "Invalid paragraph index." });
        }
        yield about_1.aboutService.deleteParagraph(index);
        res.status(204).send();
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.deleteParagraph = deleteParagraph;
