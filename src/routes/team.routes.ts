import express from "express";
import { 
    getAllTeams, 
    createTeam, 
    patchTeam, 
    getTeamById, 
    getMyTeams, 
    getAllTeamProposals, 
    addTeamProposal,
    deleteTeam 
} from "../controller/team.controller";
import { validateRequest, requiredUser, isUserSubscribed } from "../middleware";

const router = express.Router();

router.get(
    "/",
    getAllTeams
);

router.post(
    "/",
    requiredUser,
    isUserSubscribed("Team"),
    createTeam
)

router.get(
    "/my-teams",
    requiredUser,
    getMyTeams
)

router.get(
    "/:id",
    getTeamById
)

router.patch(
    "/:id",
    patchTeam
)

router.delete(
    "/:id",
    deleteTeam
)

router.get(
    "/:id/proposals",
    getAllTeamProposals
)

router.post(
    "/:id/proposals",
    requiredUser,
    addTeamProposal
)

export default router;