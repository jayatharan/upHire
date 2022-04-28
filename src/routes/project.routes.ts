import express from "express";
import { getAllProjects, createProject } from "../controller/project.controller";
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

export default router;
