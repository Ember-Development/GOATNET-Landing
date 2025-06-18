import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import path from "path";

dotenv.config();

export const startServer = () => {
  const app = express();
  const PORT = process.env.PORT || 8080;

  const ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://dev.goatnet.io",
    "https://cms.dev.goatnet.io",
  ];

  // CORS configuration
  app.use(
    cors({
      origin: (incomingOrigin, callback) => {
        if (!incomingOrigin || ALLOWED_ORIGINS.includes(incomingOrigin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS blocked: ${incomingOrigin}`));
        }
      },
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Log incoming requests
  app.use((req, _res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
  });

  // Health check
  app.get("/", (_req, res) => {
    res.send("🐐 GOATNET backend is up and running!");
  });

  // Static file serving
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

  // Main API router
  app.use("/api", router);

  // Error handler (must be last)
  app.use(
    (err: any, _req: express.Request, res: express.Response, _next: any) => {
      console.error("[UNHANDLED ERROR]", err);
      res.status(500).json({ error: "Internal server error" });
    }
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};
