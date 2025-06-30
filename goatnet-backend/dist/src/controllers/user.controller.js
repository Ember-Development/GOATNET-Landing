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
exports.deleteUser = exports.updateUser = exports.getUser = exports.listUsers = void 0;
const user_1 = require("../services/user");
// GET ALL
const listUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.userService.getAll();
    return res.json(users);
});
exports.listUsers = listUsers;
// GET
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.userService.getById(req.params.id);
    return res.json(user);
});
exports.getUser = getUser;
// PATCH
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, imageUrl, link, showOnLanding, landingOrder } = req.body;
        const updated = yield user_1.userService.update(req.params.id, {
            name,
            imageUrl,
            link,
            showOnLanding,
            landingOrder,
        });
        return res.json(updated);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
exports.updateUser = updateUser;
// DELETE
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.userService.delete(req.params.id);
        return res.json({ success: true });
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
exports.deleteUser = deleteUser;
