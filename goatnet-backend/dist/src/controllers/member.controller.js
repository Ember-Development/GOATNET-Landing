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
exports.deleteCredential = exports.updateCredential = exports.createCredential = exports.getLandingCredentials = void 0;
const member_1 = require("../services/member");
// GET /credential/credentials
const getLandingCredentials = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creds = yield member_1.credentialService.getAllLandingCredentials();
        res.json(creds);
    }
    catch (err) {
        console.error("Error fetching credentials:", err);
        res.status(500).json({ error: "Failed to fetch credentials" });
    }
});
exports.getLandingCredentials = getLandingCredentials;
// POST /credential/credentials
const createCredential = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, link, landingOrder } = req.body;
        let imageUrl = undefined;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        else if (req.body.imageUrl) {
            imageUrl = req.body.imageUrl;
        }
        if (!name || !landingOrder) {
            res.status(400).json({ error: "Name and landingOrder are required" });
        }
        const newCred = yield member_1.credentialService.createLandingCredential({
            name,
            link,
            imageUrl,
            landingOrder: Number(landingOrder),
        });
        res.status(201).json(newCred);
    }
    catch (err) {
        console.error("Error creating credential:", err);
        res.status(400).json({ error: err.message });
    }
});
exports.createCredential = createCredential;
// PUT /credential/credentials/:id
const updateCredential = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { name, link, landingOrder } = req.body;
        let imageUrl = undefined;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        else if (req.body.imageUrl) {
            imageUrl = req.body.imageUrl;
        }
        if (!name || !landingOrder) {
            res.status(400).json({ error: "Name and landingOrder are required" });
        }
        const updated = yield member_1.credentialService.updateLandingCredential({
            id,
            name,
            link,
            imageUrl,
            landingOrder: Number(landingOrder),
        });
        res.json(updated);
    }
    catch (err) {
        console.error("Error updating credential:", err);
        res.status(400).json({ error: err.message });
    }
});
exports.updateCredential = updateCredential;
// DELETE /credential/credentials/:id
const deleteCredential = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield member_1.credentialService.deleteLandingCredential(id);
        res.json({ success: true });
    }
    catch (err) {
        console.error("Error deleting credential:", err);
        res.status(400).json({ error: err.message });
    }
});
exports.deleteCredential = deleteCredential;
