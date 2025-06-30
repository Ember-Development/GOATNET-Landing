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
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const client_1 = __importDefault(require("../../prisma/client"));
exports.authService = {
    _findUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.user.findUnique({ where: { email } });
    }),
    register: (email_1, password_1, ...args_1) => __awaiter(void 0, [email_1, password_1, ...args_1], void 0, function* (email, password, role = "VIEWER") {
        const hashed = yield bcryptjs_1.default.hash(password, 10);
        const user = yield client_1.default.user.create({
            data: {
                email,
                password: hashed,
                role: role,
            },
        });
        return user;
    }),
    login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield client_1.default.user.findUnique({ where: { email } });
        if (!user)
            throw new Error("Invalid credentials");
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match)
            throw new Error("Invalid credentials");
        const token = (0, jwt_1.signToken)({ userId: user.id, role: user.role });
        return { token, user };
    }),
};
