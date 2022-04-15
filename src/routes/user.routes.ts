import express from "express";
import { createUserHandler } from "../controller/user.controller";
import { createUserSchema } from "../schema/user.schema";
import { validateRequest } from "../middleware";

const router = express.Router();

router.post(
    "/",
    validateRequest(createUserSchema),
    createUserHandler
);

export default router;