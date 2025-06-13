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
exports.solutionService = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.solutionService = {
    getAllTabs: () => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.solutionTab.findMany({ include: { items: true } });
    }),
    createTab: (name, tagline) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.solutionTab.create({ data: { name, tagline } });
    }),
    updateTab: (id, name, tagline) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.solutionTab.update({
            where: { id },
            data: { name, tagline },
            include: { items: true },
        });
    }),
    deleteTab: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.solutionTab.delete({ where: { id } });
    }),
    createItem: (tabId, title, tag, description) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.solutionItem.create({
            data: { tabId, title, tag, description },
        });
    }),
    updateItem: (id, title, tag, description) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.solutionItem.update({
            where: { id },
            data: { title, tag, description },
        });
    }),
    deleteItem: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.solutionItem.delete({ where: { id } });
    }),
};
