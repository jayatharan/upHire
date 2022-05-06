import express from "express";
import { getAllJobs, createJob, patchJob, getJobById, getMyJobs, getAllJobProposals, addJobProposal } from "../controller/job.controller";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.get(
    "/",
    getAllJobs
);

router.post(
    "/",
    requiredUser,
    createJob
)

router.get(
    "/my-jobs",
    requiredUser,
    getMyJobs
)

router.get(
    "/:id",
    getJobById
)

router.patch(
    "/:id",
    patchJob
)

router.get(
    "/:id/proposals",
    getAllJobProposals
)

router.post(
    "/:id/proposals",
    requiredUser,
    addJobProposal
)

export default router;