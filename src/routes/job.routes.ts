import express from "express";
import { 
    getAllJobs, 
    createJob, 
    patchJob, 
    getJobById, 
    getMyJobs, 
    getAllJobProposals, 
    addJobProposal, 
    deleteJob 
} from "../controller/job.controller";
import { validateRequest, requiredUser, isUserSubscribed } from "../middleware";

const router = express.Router();

router.get(
    "/",
    getAllJobs
);

router.post(
    "/",
    requiredUser,
    isUserSubscribed("Job"),
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

router.delete(
    "/:id",
    deleteJob
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