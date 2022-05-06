import express from "express";
import { 
    createUserHandler, 
    updateUserBiography, 
    getUserDetails, 
    addUserProfessionalDetail, 
    addUserEducationalDetail, 
    addUserProjectDetail,
    verifyEmailAddress
} from "../controller/user.controller";
import { createUserSchema, verifyEmailSchema } from "../schema/user.schema";
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

export default router;