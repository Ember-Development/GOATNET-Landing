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
exports.deleteItem = exports.updateItem = exports.createItem = exports.deleteTab = exports.updateTab = exports.createTab = exports.getAllTabs = void 0;
const solutions_1 = require("../services/solutions");
// GET /solutions
const getAllTabs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tabs = yield solutions_1.solutionService.getAllTabs();
    res.json(tabs);
});
exports.getAllTabs = getAllTabs;
// POST /solutions/tabs
const createTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, tagline } = req.body;
        const tab = yield solutions_1.solutionService.createTab(name, tagline);
        res.json(tab);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createTab = createTab;
// PATCH /solutions/tabs/:id
const updateTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, tagline } = req.body;
        const tab = yield solutions_1.solutionService.updateTab(id, name, tagline);
        res.json(tab);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updateTab = updateTab;
// DELETE /solutions/tabs/:id
const deleteTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield solutions_1.solutionService.deleteTab(id);
        res.json({ success: true });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.deleteTab = deleteTab;
// POST /solutions/tabs/:tabId/items
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tabId = parseInt(req.params.tabId);
        const { title, tag, description } = req.body;
        const item = yield solutions_1.solutionService.createItem(tabId, title, tag, description);
        res.json(item);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createItem = createItem;
// PATCH /solutions/items/:itemId
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.itemId);
        const { title, tag, description } = req.body;
        const item = yield solutions_1.solutionService.updateItem(id, title, tag, description);
        res.json(item);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updateItem = updateItem;
// DELETE /solutions/items/:itemId
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.itemId);
        yield solutions_1.solutionService.deleteItem(id);
        res.json({ success: true });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.deleteItem = deleteItem;
