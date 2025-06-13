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
exports.attractionService = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.attractionService = {
    getAllShowcase: () => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.attraction.findMany({
            where: { showOnLanding: true },
            orderBy: { landingOrder: "asc" },
        });
    }),
    createAttraction: (title, caption, imageUrl, videoUrl, type, channels, showOnLanding, landingOrder) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.attraction.create({
            data: {
                title,
                description: caption,
                imageUrl,
                videoUrl,
                type,
                channels: {
                    connect: channels.map((channelId) => ({ id: channelId })),
                },
                showOnLanding,
                landingOrder,
            },
            include: {
                channels: true,
            },
        });
    }),
    updateAttraction: (id, title, caption, imageUrl, videoUrl, type, channels, showOnLanding, landingOrder) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.attraction.update({
            where: { id },
            data: {
                title,
                description: caption,
                imageUrl,
                videoUrl,
                type,
                channels: {
                    set: channels.map((channelId) => ({ id: channelId })),
                },
                showOnLanding,
                landingOrder,
            },
            include: {
                channels: true,
            },
        });
    }),
    deleteAttraction: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.attraction.delete({ where: { id } });
    }),
};
