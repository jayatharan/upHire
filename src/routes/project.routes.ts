import express from "express";
import {
    getAllProject, 
    createProject,
    updateProject,
    getProject,
    deleteProject,
    getMyProjects
} from "../controllers/project.controller";
import { 
    requiredUser
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllProject
)

router.post(
    "/",
    requiredUser,
    createProject
)

router.get(
    "/my-projects",
    requiredUser,
    getMyProjects
)

router.patch(
    "/:id",
    requiredUser,
    updateProject
)

router.get(
    "/:id",
    requiredUser,
    getProject
)

router.delete(
    "/:id",
    requiredUser,
    deleteProject
)

export default router;