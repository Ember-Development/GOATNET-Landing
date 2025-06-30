import { Router } from "express";

// Auth
import { register, login } from "./controllers/auth.controller";

// Landing controllers
import { getHero, upsertHero } from "./controllers/hero.controller";
import {
  getAboutSection,
  updateTitle,
  updateYoutubeUrl,
  addParagraph,
  updateParagraph,
  deleteParagraph,
} from "./controllers/about.controller";
import {
  getAllTabs,
  createTab,
  updateTab,
  deleteTab,
  createItem,
  updateItem,
  deleteItem,
} from "./controllers/solutions.controller";
import {
  getAllShowcaseItems,
  createShowcaseItem,
  updateShowcaseItem,
  deleteShowcaseItem,
} from "./controllers/showcase.controller";
import {
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "./controllers/partners.controller";
import {
  getLandingCredentials,
  createCredential,
  updateCredential,
  deleteCredential,
} from "./controllers/member.controller";
import { Subscribe } from "./controllers/newsletter.controller";

// Middleware
import { authenticate, authorize } from "./middleware/auth.middleware";

// Upload
import { uploadImage, uploadVideo } from "./controllers/upload.controller";

const router = Router();

// 1. Auth Routes (Public)
router.post("/auth/register", register);
router.post("/auth/login", login);

// Upload Routes (Public)
router.post("/upload/image", uploadImage);
router.post("/upload/video", uploadVideo);

// Landing‐Page Routes (Public)
// Hero
router.get("/hero", getHero);
// If you want to allow editing Hero (Admin/Editor):
router.post("/hero", authenticate, authorize(["ADMIN", "EDITOR"]), upsertHero);

// About
router.get("/about", getAboutSection);
router.patch(
  "/about/title",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  updateTitle
);
router.patch(
  "/about/youtubeUrl",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  updateYoutubeUrl
);
router.post(
  "/about/paragraphs",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  addParagraph
);
router.patch(
  "/about/paragraphs/:index",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  updateParagraph
);
router.delete(
  "/about/paragraphs/:index",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  deleteParagraph
);

// Solutions
router.get("/solutions", getAllTabs);
router.post(
  "/solutions/tabs",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  createTab
);
router.put(
  "/solutions/tabs/:id",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  updateTab
);
router.delete(
  "/solutions/tabs/:id",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  deleteTab
);

router.post(
  "/solutions/tabs/:tabId/items",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  createItem
);
router.put(
  "/solutions/items/:itemId",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  updateItem
);
router.delete(
  "/solutions/items/:itemId",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  deleteItem
);

// Showcase (Landing)
router.get("/showcase", getAllShowcaseItems);

router.post(
  "/showcase",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  createShowcaseItem
);

router.put(
  "/showcase/:id",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  updateShowcaseItem
);

router.delete(
  "/showcase/:id",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  deleteShowcaseItem
);

// Credentials (Landing)
// Anyone can GET the list; only ADMIN/EDITOR can create/update/delete
router.get("/credential/credentials", getLandingCredentials);

router.post(
  "/credential/credentials",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  uploadImage[0], // ← run Multer.single("file") here
  createCredential
);

router.put(
  "/credential/credentials/:id",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  uploadImage[0], // ← run Multer.single("file") here, too
  updateCredential
);
router.delete(
  "/credential/credentials/:id",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  deleteCredential
);

// Partners (Landing)
router.get("/partners", getAllPartners);
router.post(
  "/partners",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  createPartner
);
router.put(
  "/partners/:id",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  updatePartner
);
router.delete(
  "/partners/:id",
  authenticate,
  authorize(["ADMIN", "EDITOR"]),
  deletePartner
);

// If you want Admins to toggle `showOnLanding` or `landingOrder`, add protected endpoints here
// Newsletter Subscribe (Landing)
router.post("/newsletter/subscribe", Subscribe);
export default router;
