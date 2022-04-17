import express from "express";
import { 
    createUserSessionHandler,
    getUserSessionsHandler,
    invalidateUserSessionHandler,
    createSessionWithGoogle,
    createAccessTokenWithRefreshToken
} from "../controller/session.controller";
import { 
    createUserSessionSchema, 
    googleLoginSchema,
    refreshTokenSchema
} from "../schema/user.schema";
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

router.post(
    "/token",
    validateRequest(refreshTokenSchema),
    createAccessTokenWithRefreshToken
)

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