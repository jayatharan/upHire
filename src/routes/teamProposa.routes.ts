import express from "express";
import { 
    getTeamProposalById,
    patchTeamProposal,
    deleteTeamProposal,
    getMyTeamProposals
} from "../controller/teamProposal.controller";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.get(
    "/my-team-proposals",
    requiredUser,
    getMyTeamProposals
)

router.get(
    "/:id",
    getTeamProposalById
)

router.patch(
    "/:id",
    requiredUser,
    patchTeamProposal
)

router.delete(
    "/:id",
    requiredUser,
    deleteTeamProposal
)

export default router;