import express from "express";
import { 
    createUserSessionHandler,
    createAccessTokenWithRefreshToken,
    createSessionWithGoogle,
    getUserSessionsHandler
} from "../controllers/session.controller";
import { requiredUser } from "../middleware";
const router = express.Router();

router.get(
    "/",
    requiredUser,
    getUserSessionsHandler
);

router.post(
    "/",
    createUserSessionHandler
);

router.post(
    "/google",
    createSessionWithGoogle
);

router.post(
    "/token",
    createAccessTokenWithRefreshToken
)

export default router;