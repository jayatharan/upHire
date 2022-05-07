import express from "express";
import { 
    getAllProjects, 
    createProject, 
    patchProject, 
    getProjectById,
    getAllProjectProposals, 
    addProjectProposal, 
    getMyProjects,
    deleteProject
} from "../controller/project.controller";
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
    "/my-projects",
    requiredUser,
    getMyProjects
)

router.get(
    "/:id",
    getProjectById
)

router.patch(
    "/:id",
    patchProject
)

router.delete(
    "/:id",
    deleteProject
)

router.get(
    "/:id/proposals",
    getAllProjectProposals
)

router.post(
    "/:id/proposals",
    requiredUser,
    addProjectProposal
)

export default router;
