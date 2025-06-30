"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
exports.authorize = authorize;
const jwt_1 = require("../utils/jwt");
// Authenticate Middleware (Sync Style)
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "Authorization required" });
            return;
        }
        const token = authHeader.replace("Bearer ", "");
        const payload = (0, jwt_1.verifyToken)(token); // assumed to be sync
        req.user = { userId: payload.userId, role: payload.role };
    }
    catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }
};
exports.authenticate = authenticate;
// Authorize Middleware (no change needed)
function authorize(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        next();
    };
}
