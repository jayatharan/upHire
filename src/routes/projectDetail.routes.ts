import express from "express";
import {
    getAllProjectDetail, 
    createProjectDetail,
    updateProjectDetail,
    getProjectDetail,
    deleteProjectDetail
} from "../controllers/projectDetail.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllProjectDetail
)

router.post(
    "/",
    requiredUser,
    createProjectDetail
)

router.patch(
    "/:id",
    requiredUser,
    updateProjectDetail
)

router.get(
    "/:id",
    requiredUser,
    getProjectDetail
)

router.delete(
    "/:id",
    requiredUser,
    deleteProjectDetail
)

export default router;