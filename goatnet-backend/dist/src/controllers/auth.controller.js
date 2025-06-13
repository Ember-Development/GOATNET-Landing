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
exports.login = exports.register = void 0;
const auth_1 = require("../services/auth");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        const user = yield auth_1.authService.register(email, password, role);
        res.json({ user });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userRecord = yield auth_1.authService._findUserByEmail(email);
        console.log("DEBUG: looked up userRecord =", userRecord);
        const { token, user } = yield auth_1.authService.login(email, password);
        res.json({ token, userId: user.id, role: user.role });
    }
    catch (err) {
        console.log("DEBUG: login error:", err.message);
        res.status(401).json({ error: err.message });
    }
});
exports.login = login;
