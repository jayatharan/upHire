import express from "express";
import { Request, Response } from "express";
import user from "./user.routes";
import session from "./session.routes";
import project from "./project.routes";
import proposal from "./proposal.routes";

const router = express.Router();

router.get("/health-check", (req: Request, res: Response) => res.sendStatus(200));

router.use("/api/users",user);
router.use("/api/sessions",session);
router.use("/api/projects",project);
router.use("/api/proposals",proposal);

export default router;