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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutService = void 0;
// services/about.ts
const client_1 = __importDefault(require("../../prisma/client"));
exports.aboutService = {
    getAbout: () => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.aboutSection.findFirst();
    }),
    upsertAbout: (title, paragraphs, youtubeUrl) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield client_1.default.aboutSection.findFirst();
        if (existing) {
            return client_1.default.aboutSection.update({
                where: { id: existing.id },
                data: { title, paragraphs, youtubeUrl },
            });
        }
        return client_1.default.aboutSection.create({
            data: { title, paragraphs, youtubeUrl },
        });
    }),
    updateTitle: (newTitle) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield client_1.default.aboutSection.findFirst();
        if (!existing) {
            throw new Error("No AboutSection found.");
        }
        return client_1.default.aboutSection.update({
            where: { id: existing.id },
            data: { title: newTitle },
        });
    }),
    updateYoutubeUrl: (newUrl) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield client_1.default.aboutSection.findFirst();
        if (!existing) {
            throw new Error("No AboutSection found.");
        }
        return client_1.default.aboutSection.update({
            where: { id: existing.id },
            data: { youtubeUrl: newUrl },
        });
    }),
    addParagraph: (text) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield client_1.default.aboutSection.findFirst();
        if (!existing) {
            throw new Error("No AboutSection found.");
        }
        const newParagraphs = [...existing.paragraphs, text];
        return client_1.default.aboutSection.update({
            where: { id: existing.id },
            data: { paragraphs: { set: newParagraphs } },
        });
    }),
    updateParagraph: (index, text) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield client_1.default.aboutSection.findFirst();
        if (!existing) {
            throw new Error("No AboutSection found.");
        }
        const currentParas = existing.paragraphs;
        if (index >= currentParas.length) {
            throw new Error("Paragraph index out of bounds.");
        }
        const updatedParas = currentParas.map((p, i) => (i === index ? text : p));
        return client_1.default.aboutSection.update({
            where: { id: existing.id },
            data: { paragraphs: { set: updatedParas } },
        });
    }),
    deleteParagraph: (index) => __awaiter(void 0, void 0, void 0, function* () {
        const existing = yield client_1.default.aboutSection.findFirst();
        if (!existing) {
            throw new Error("No AboutSection found.");
        }
        const currentParas = existing.paragraphs;
        if (index >= currentParas.length) {
            throw new Error("Paragraph index out of bounds.");
        }
        const updatedParas = currentParas.filter((_, i) => i !== index);
        return client_1.default.aboutSection.update({
            where: { id: existing.id },
            data: { paragraphs: { set: updatedParas } },
        });
    }),
};
