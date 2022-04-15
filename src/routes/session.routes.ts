import express from "express";
import { 
    createUserSessionHandler,
    getUserSessionsHandler,
    invalidateUserSessionHandler
} from "../controller/session.controller";
import { createUserSessionSchema } from "../schema/user.schema";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.post(
    "/",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
);

router.get(
    "/",
    requiredUser,
    getUserSessionsHandler
);

router.delete(
    "/", 
    requiredUser, 
    invalidateUserSessionHandler
);

export default router;