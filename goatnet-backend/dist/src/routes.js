"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Auth
const auth_controller_1 = require("./controllers/auth.controller");
// Landing controllers
const hero_controller_1 = require("./controllers/hero.controller");
const about_controller_1 = require("./controllers/about.controller");
const solutions_controller_1 = require("./controllers/solutions.controller");
const showcase_controller_1 = require("./controllers/showcase.controller");
const partners_controller_1 = require("./controllers/partners.controller");
const member_controller_1 = require("./controllers/member.controller");
const newsletter_controller_1 = require("./controllers/newsletter.controller");
// Middleware
const auth_middleware_1 = require("./middleware/auth.middleware");
// Upload
const upload_controller_1 = require("./controllers/upload.controller");
const router = (0, express_1.Router)();
// 1. Auth Routes (Public)
router.post("/auth/register", auth_controller_1.register);
router.post("/auth/login", auth_controller_1.login);
// Upload Routes (Public)
router.post("/upload/image", upload_controller_1.uploadImage);
router.post("/upload/video", upload_controller_1.uploadVideo);
// Landing‐Page Routes (Public)
// Hero
router.get("/hero", hero_controller_1.getHero);
// If you want to allow editing Hero (Admin/Editor):
router.post("/hero", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), hero_controller_1.upsertHero);
// About
router.get("/about", about_controller_1.getAboutSection);
router.patch("/about/title", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), about_controller_1.updateTitle);
router.patch("/about/youtubeUrl", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), about_controller_1.updateYoutubeUrl);
router.post("/about/paragraphs", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), about_controller_1.addParagraph);
router.patch("/about/paragraphs/:index", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), about_controller_1.updateParagraph);
router.delete("/about/paragraphs/:index", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), about_controller_1.deleteParagraph);
// Solutions
router.get("/solutions", solutions_controller_1.getAllTabs);
router.post("/solutions/tabs", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), solutions_controller_1.createTab);
router.put("/solutions/tabs/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), solutions_controller_1.updateTab);
router.delete("/solutions/tabs/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), solutions_controller_1.deleteTab);
router.post("/solutions/tabs/:tabId/items", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), solutions_controller_1.createItem);
router.put("/solutions/items/:itemId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), solutions_controller_1.updateItem);
router.delete("/solutions/items/:itemId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), solutions_controller_1.deleteItem);
// Showcase (Landing)
router.get("/showcase", showcase_controller_1.getAllShowcaseItems);
router.post("/showcase", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), showcase_controller_1.createShowcaseItem);
router.put("/showcase/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), showcase_controller_1.updateShowcaseItem);
router.delete("/showcase/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), showcase_controller_1.deleteShowcaseItem);
// Credentials (Landing)
// Anyone can GET the list; only ADMIN/EDITOR can create/update/delete
router.get("/credential/credentials", member_controller_1.getLandingCredentials);
router.post("/credential/credentials", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), upload_controller_1.uploadImage[0], // ← run Multer.single("file") here
member_controller_1.createCredential);
router.put("/credential/credentials/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), upload_controller_1.uploadImage[0], // ← run Multer.single("file") here, too
member_controller_1.updateCredential);
router.delete("/credential/credentials/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), member_controller_1.deleteCredential);
// Partners (Landing)
router.get("/partners", partners_controller_1.getAllPartners);
router.post("/partners", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), partners_controller_1.createPartner);
router.put("/partners/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), partners_controller_1.updatePartner);
router.delete("/partners/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["ADMIN", "EDITOR"]), partners_controller_1.deletePartner);
// If you want Admins to toggle `showOnLanding` or `landingOrder`, add protected endpoints here
// Newsletter Subscribe (Landing)
router.post("/newsletter/subscribe", newsletter_controller_1.Subscribe);
exports.default = router;
