import express from "express";
import { 
    getProposalById,
    patchProposal,
    deleteProposal,
    getMyProposals
} from "../controller/proposal.controller";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.get(
    "/my-proposals",
    requiredUser,
    getMyProposals
)

router.get(
    "/:id",
    getProposalById
)

router.patch(
    "/:id",
    requiredUser,
    patchProposal
)

router.delete(
    "/:id",
    requiredUser,
    deleteProposal
)

export default router;