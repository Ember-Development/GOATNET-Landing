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
exports.credentialService = void 0;
// src/services/member.service.ts
const client_1 = __importDefault(require("../../prisma/client"));
exports.credentialService = {
    getAllLandingCredentials: () => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.user.findMany({
            where: { showOnLanding: true },
            orderBy: { landingOrder: "asc" },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                link: true,
                landingOrder: true,
            },
        });
    }),
    createLandingCredential: (data) => __awaiter(void 0, void 0, void 0, function* () {
        // NEED TO COME BACK TO THIS/ MIGHT BE EASIER TO SPLIT CREDENTIAL INTO ITS OWN TABLE AND JUST OPTIONALLY CONNECT USER ID?
        // HOW THAT CONNECTION HAPPENS NEEDS TO BE WEEDED OUT
        // RUN INTO A BASEBALLCLOUD ISSUE WITH HOW DO WE ACCURATELY CONNECT USER TO CRED WITH OUT IT BEING A FREE FOR ALL/ WHATS THE IDENTIFIER
        const placeholderEmail = `landing_${Date.now()}@example.com`;
        const placeholderPassword = "CHANGE_ME"; // ideally hash one
        const created = yield client_1.default.user.create({
            data: {
                email: placeholderEmail,
                password: placeholderPassword,
                role: "VIEWER",
                name: data.name,
                link: data.link,
                imageUrl: data.imageUrl,
                showOnLanding: true,
                landingOrder: data.landingOrder,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                link: true,
                landingOrder: true,
            },
        });
        return created;
    }),
    updateLandingCredential: (args) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, name, link, imageUrl, landingOrder } = args;
        return client_1.default.user.update({
            where: { id: String(id) },
            data: {
                name,
                link,
                imageUrl,
                landingOrder,
                showOnLanding: true,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                link: true,
                landingOrder: true,
            },
        });
    }),
    deleteLandingCredential: (id) => __awaiter(void 0, void 0, void 0, function* () {
        // We’ll simply delete the user record entirely. If you prefer to only toggle
        return client_1.default.user.delete({ where: { id: String(id) } });
    }),
};
