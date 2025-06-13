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
exports.upsertHero = exports.getHero = void 0;
const hero_1 = require("../services/hero");
// GET /hero
const getHero = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hero = yield hero_1.heroService.getHero();
    res.json(hero);
});
exports.getHero = getHero;
// POST /hero (Protected)
const upsertHero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { desktopVideoUrl, mobileVideoUrl } = req.body;
        const updated = yield hero_1.heroService.upsertHero(desktopVideoUrl, mobileVideoUrl);
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.upsertHero = upsertHero;
