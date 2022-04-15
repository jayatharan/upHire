import express from "express";
import { Request, Response } from "express";
import user from "./user.routes";
import session from "./session.routes";

const router = express.Router();

router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

router.use("/api/users",user);
router.use("/api/sessions",session);

export default router;