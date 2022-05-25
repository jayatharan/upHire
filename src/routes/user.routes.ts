import express from "express";
import { 
    createUserHandler, 
    updateUserBiography, 
    getUserDetails, 
    addUserProfessionalDetail, 
    addUserEducationalDetail, 
    addUserProjectDetail,
    verifyEmailAddress,
    subscribeService,
    getMySubscriptions,
    unSubscribe,
    updateUserHandler
} from "../controller/user.controller";
import { createUserSchema, verifyEmailSchema, updateUserSchema } from "../schema/user.schema";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.post(
    "/",
    validateRequest(createUserSchema),
    createUserHandler
);

router.get(
    "/",
    requiredUser,
    getUserDetails
);

router.patch(
    "/",
    requiredUser,
    validateRequest(updateUserSchema),
    updateUserHandler
)

router.post(
    "/verify-email",
    validateRequest(verifyEmailSchema),
    verifyEmailAddress
)

router.post(
    "/biography",
    requiredUser,
    updateUserBiography
);

router.post(
    "/professional-detail",
    requiredUser,
    addUserProfessionalDetail
);

router.post(
    "/educational-detail",
    requiredUser,
    addUserEducationalDetail
)

router.post(
    "/project-detail",
    requiredUser,
    addUserProjectDetail
)

router.get(
    "/subscriptions",
    requiredUser,
    getMySubscriptions
)

router.post(
    "/subscriptions",
    requiredUser,
    subscribeService
)

router.delete(
    "/subscriptions/:service",
    requiredUser,
    unSubscribe
)

export default router;