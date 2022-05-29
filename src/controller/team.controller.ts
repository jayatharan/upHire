import mongoose from "mongoose";
import { Request, Response } from "express";
import TeamService from "../service/team.service";
import TeamProposalService from "../service/teamProposal.service";
import { TeamDocument } from "../model/team.model";
import { TeamProposalDocument } from "../model/teamProposal.model";
import log from "../logger";
import { get } from "lodash";
import { Pagination, extractPagination } from "../utils/query.utils";

export async function getAllTeams(req: Request, res: Response) {
    try{
        const pagination:Pagination = extractPagination(req);
        const Teams = await TeamService.baseApi.list(pagination.limit, pagination.page)
        return res.send(Teams)
    } catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createTeam(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as TeamDocument;
        data.userId = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        const Team = await TeamService.baseApi.create(data);
        res.send(Team);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getTeamById(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const Team = await TeamService.baseApi.get(id);
        res.send(Team);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function patchTeam(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        let data = req.body as TeamDocument;
        const Team = await TeamService.baseApi.patch(id, data);
        res.send(Team);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteTeam(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const Team = await TeamService.baseApi.get(id);
        await Team?.remove();
        res.send(Team);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function addTeamProposal(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        let data = req.body as TeamProposalDocument;
        data.userId = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        data.teamId = id;
        const Teamproposal = await TeamProposalService.baseApi.create(data);
        res.send(Teamproposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyTeams(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const pagination:Pagination = extractPagination(req);
        const Teams = await TeamService.getMyTeams(user._id, pagination.limit, pagination.page);
        return res.send(Teams);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getAllTeamProposals(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const pagination:Pagination = extractPagination(req);
        const Teamproposals = await TeamService.getAllTeamProposals(pagination.limit, pagination.page, id);
        return res.send(Teamproposals)
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}