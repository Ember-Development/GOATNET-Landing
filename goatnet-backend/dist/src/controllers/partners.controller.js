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
exports.deletePartner = exports.updatePartner = exports.createPartner = exports.getAllPartners = void 0;
const partner_1 = require("../services/partner");
// GET /partners
const getAllPartners = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partners = yield partner_1.partnerService.getAll();
    res.json(partners);
});
exports.getAllPartners = getAllPartners;
// POST /partners
const createPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, imageUrl, link, order } = req.body;
        const partner = yield partner_1.partnerService.create(name, imageUrl, link, order);
        res.json(partner);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createPartner = createPartner;
// PATCH /partners/:id
const updatePartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, imageUrl, link, order } = req.body;
        const partner = yield partner_1.partnerService.update(id, name, imageUrl, link, order);
        res.json(partner);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updatePartner = updatePartner;
// DELETE /partners/:id
const deletePartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield partner_1.partnerService.delete(id);
        res.json({ success: true });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.deletePartner = deletePartner;
