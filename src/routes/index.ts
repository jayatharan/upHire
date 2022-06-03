import express from "express";
import { Request, Response } from "express";

import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import addressRoutes from "./address.routes";
import companyRoutes from "./company.routes";
import biographyRoutes from "./biography.routes";
import projectDetailRoutes from "./projectDetail.routes";
import educationalDetailRoutes from "./educationalDetail.routes";
import professionalDetailRoutes from "./professionalDetail.routes";
import projectRoutes from "./project.routes";

const router = express.Router();

router.get("/", (req: Request, res: Response) => res.send("Welcome to uphire server"));
router.get("/health-check", (req: Request, res: Response) => res.sendStatus(200));

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);
router.use("/address", addressRoutes);
router.use("/company", companyRoutes);
router.use("/biography", biographyRoutes);
router.use("/project-details", projectDetailRoutes);
router.use("/educational-details", educationalDetailRoutes);
router.use("/professional-details", professionalDetailRoutes);
router.use("/projects", projectRoutes);

export default router;