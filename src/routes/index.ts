import express from "express";
import { Request, Response } from "express";
import user from "./user.routes";
import session from "./session.routes";
import project from "./project.routes";
import proposal from "./proposal.routes";
import EducationalDetail from "./educationalDetail.routes";
import ProfessionalDetail from "./professionalDetail.routes";
import ProjectDetail from "./projectDetail.routes";

const router = express.Router();

router.get("/", (req: Request, res: Response) => res.send("Welcome to uphire server"));
router.get("/health-check", (req: Request, res: Response) => res.sendStatus(200));

router.use("/api/users",user);
router.use("/api/sessions",session);
router.use("/api/projects",project);
router.use("/api/proposals",proposal);
router.use("/api/educational-details",EducationalDetail);
router.use("/api/professional-details",ProfessionalDetail);
router.use("/api/project-details",ProjectDetail);

export default router;