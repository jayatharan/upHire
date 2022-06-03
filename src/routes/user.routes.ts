import express from "express";
import {
    createUserHandler, 
    updateUserHandler, 
    updateUserBiography, 
    getUserDetails,
    subscribeService,
    getMySubscriptions,
    unSubscribe,
    addUserProjectDetail,
    addUserEducationalDetail,
    addUserProfessionalDetail,
    getUserEducationalDetails,
    getUserProfessionalDetails,
    getUserProjectDetails
} from '../controllers/user.controller'
import { 
    createUserSchema, updateUserSchema
} from "../schemas/user.schema";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getUserDetails
);

router.post(
    "/",
    validateRequest(createUserSchema),
    createUserHandler
)

router.patch(
    "/",
    validateRequest(updateUserSchema),
    requiredUser,
    updateUserHandler
)

router.post(
    "/biography",
    requiredUser,
    updateUserBiography
);

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

router.get(
    "/project-detail",
    requiredUser,
    getUserProjectDetails
)

router.post(
    "/project-detail",
    requiredUser,
    addUserProjectDetail
)

router.get(
    "/educational-detail",
    requiredUser,
    getUserEducationalDetails
)

router.post(
    "/educational-detail",
    requiredUser,
    addUserEducationalDetail
)

router.get(
    "/professional-detail",
    requiredUser,
    getUserProfessionalDetails
)

router.post(
    "/professional-detail",
    requiredUser,
    addUserProfessionalDetail
)

export default router;