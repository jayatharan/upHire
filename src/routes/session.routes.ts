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
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
);

router.get(
    "/api/sessions",
    requiredUser,
    getUserSessionsHandler
);

router.delete(
    "/api/sessions", 
    requiredUser, 
    invalidateUserSessionHandler
);

export default router;