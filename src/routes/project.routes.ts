import express from "express";
import { getAllProjects, createProject, patchProject, getProjectById } from "../controller/project.controller";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.get(
    "/",
    getAllProjects
);

router.post(
    "/",
    requiredUser,
    createProject
)

router.get(
    "/:id",
    getProjectById
)

router.patch(
    "/:id",
    patchProject
)

export default router;
