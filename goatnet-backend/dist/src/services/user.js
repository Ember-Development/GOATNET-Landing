"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.userService = {
    getAll: () => client_1.default.user.findMany(),
    getById: (id) => client_1.default.user.findUnique({ where: { id } }),
    update: (id, data) => client_1.default.user.update({ where: { id }, data }),
    delete: (id) => client_1.default.user.delete({ where: { id } }),
};
