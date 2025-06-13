"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const startServer = () => {
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 8080;
    const ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://dev.goatnet.io",
    ];
    app.use((0, cors_1.default)({
        origin: (incomingOrigin, callback) => {
            if (!incomingOrigin || ALLOWED_ORIGINS.includes(incomingOrigin)) {
                callback(null, true);
            }
            else {
                callback(new Error(`CORS blocked: ${incomingOrigin}`));
            }
        },
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        res.send("🐐 GOATNET backend is up and running!");
    });
    app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
    app.use("/api", routes_1.default);
    app.use((err, _req, res, _next) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
exports.startServer = startServer;
