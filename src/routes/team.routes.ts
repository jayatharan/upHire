import express from "express";
import { getAllTeams, createTeam, patchTeam, getTeamById, getMyTeams, getAllTeamProposals, addTeamProposal } from "../controller/team.controller";
import { validateRequest, requiredUser } from "../middleware";

const router = express.Router();

router.get(
    "/",
    getAllTeams
);

router.post(
    "/",
    requiredUser,
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