import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import path from "path";

dotenv.config();

export const startServer = () => {
  const app = express();
  const PORT = process.env.PORT || 8080;

  // CORS configuration
  app.use(
    cors({
      origin: (incomingOrigin, callback) => {
        console.log("[CORS ORIGIN]", incomingOrigin);
        const allowed = [
          "http://localhost:5173",
          "http://localhost:5174",
          "https://dev.goatnet.io",
          "https://cms.dev.goatnet.io",
          "https://goatnet.io",
          "https://www.goatnet.io",
          "https://cms.goatnet.io",
        ];
        if (!incomingOrigin || allowed.includes(incomingOrigin)) {
          callback(null, true);
        } else {
          console.warn(`❌ CORS blocked: ${incomingOrigin}`);
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
  const realUploads = path.join(__dirname, "../../../uploads");
  console.log("→ [DEBUG] Serving static files from:", realUploads);
  app.use("/uploads", express.static(realUploads));

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
