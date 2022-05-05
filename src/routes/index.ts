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

router.use("/users",user);
router.use("/sessions",session);
router.use("/projects",project);
router.use("/proposals",proposal);
router.use("/educational-details",EducationalDetail);
router.use("/professional-details",ProfessionalDetail);
router.use("/project-details",ProjectDetail);

export default router;