import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import path from "path";

dotenv.config();

export const startServer = () => {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true,
    })
  );
  app.use(express.json());

  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.use("/api", router);

  app.use(
    (err: any, _req: express.Request, res: express.Response, _next: any) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
