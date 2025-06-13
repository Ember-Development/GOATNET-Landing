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
exports.deleteShowcaseItem = exports.updateShowcaseItem = exports.createShowcaseItem = exports.getAllShowcaseItems = void 0;
const showcase_1 = require("../services/showcase");
// GET /showcase
const getAllShowcaseItems = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield showcase_1.attractionService.getAllShowcase();
        res.json(items);
    }
    catch (err) {
        console.error("Error fetching showcase items:", err);
        res.status(500).json({ error: "Unable to fetch showcase items" });
    }
});
exports.getAllShowcaseItems = getAllShowcaseItems;
// POST /showcase
const createShowcaseItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, caption, imageUrl, videoUrl, type, channels, showOnLanding, landingOrder, } = req.body;
        const newItem = yield showcase_1.attractionService.createAttraction(title, caption, imageUrl, videoUrl, type, channels, showOnLanding === true, landingOrder);
        res.json(newItem);
    }
    catch (err) {
        console.error("Error creating attraction:", err);
        res.status(400).json({ error: err.message });
    }
});
exports.createShowcaseItem = createShowcaseItem;
// PUT /showcase/:id
const updateShowcaseItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, caption, imageUrl, videoUrl, type, channels, showOnLanding, landingOrder, } = req.body;
        const updatedItem = yield showcase_1.attractionService.updateAttraction(id, title, caption, imageUrl, videoUrl, type, channels, showOnLanding === true, landingOrder);
        res.json(updatedItem);
    }
    catch (err) {
        console.error("Error updating attraction:", err);
        res.status(400).json({ error: err.message });
    }
});
exports.updateShowcaseItem = updateShowcaseItem;
// DELETE /showcase/:id
const deleteShowcaseItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield showcase_1.attractionService.deleteAttraction(id);
        res.json({ success: true });
    }
    catch (err) {
        console.error("Error deleting attraction:", err);
        res.status(400).json({ error: err.message });
    }
});
exports.deleteShowcaseItem = deleteShowcaseItem;
