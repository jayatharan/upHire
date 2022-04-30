import express from "express";
import { getAllProjects, createProject, patchProject, getProjectById,getAllProjectProposals } from "../controller/project.controller";
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

router.get(
    "/:id/proposals",
    getAllProjectProposals
)

export default router;
