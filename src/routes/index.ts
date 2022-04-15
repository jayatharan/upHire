import express from "express";
import { Request, Response } from "express";
import user from "./user.routes";
import session from "./session.routes";

const router = express.Router();

router.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

router.use(user);
router.use(session);

export default router;