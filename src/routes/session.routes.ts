import express from "express";
import { 
    createUserSessionHandler,
    getUserSessionsHandler,
    invalidateUserSessionHandler,
    createSessionWithGoogle
} from "../controller/session.controller";
import { createUserSessionSchema, googleLoginSchema } from "../schema/user.schema";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.post(
    "/",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
);

router.post(
    "/google",
    validateRequest(googleLoginSchema),
    createSessionWithGoogle
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