import express from "express";
import { 
    getJobProposalById,
    patchJobProposal,
    deleteJobProposal,
    getMyJobProposals
} from "../controller/jobProposal.controller";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.get(
    "/my-job-proposals",
    requiredUser,
    getMyJobProposals
)

router.get(
    "/:id",
    getJobProposalById
)

router.patch(
    "/:id",
    requiredUser,
    patchJobProposal
)

router.delete(
    "/:id",
    requiredUser,
    deleteJobProposal
)

export default router;