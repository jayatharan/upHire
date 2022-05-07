import mongoose from "mongoose";
import { Request, Response } from "express";
import TeamProposalService from "../service/teamProposal.service";
import { TeamProposalDocument } from "../model/teamProposal.model";
import log from "../logger";
import { get } from "lodash";
import { Pagination, extractPagination } from "../utils/query.utils";

export async function getAllTeamProposals(req: Request, res: Response) {
    try{
        const pagination:Pagination = extractPagination(req);
        const teamProposals = await TeamProposalService.baseApi.list(pagination.limit, pagination.page)
        return res.send(teamProposals)
    } catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createTeamProposal(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as TeamProposalDocument;
        data.user = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        const teamProposal = await TeamProposalService.baseApi.create(data);
        return res.send(teamProposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getTeamProposalById(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const teamProposal = await TeamProposalService.baseApi.get(id);
        return res.send(teamProposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function patchTeamProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        let data = req.body as TeamProposalDocument;
        const existingTeamProposal = await TeamProposalService.baseApi.get(id);
        if(existingTeamProposal === null || existingTeamProposal.user.toString() !== user._id) return res.status(403).send();
        const teamProposal = await TeamProposalService.baseApi.patch(id, data);
        return res.send(teamProposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteTeamProposal(req: Request, res: Response){
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        const teamProposal = await TeamProposalService.baseApi.get(id);
        if(teamProposal === null || teamProposal.user.toString() === user._id) return res.status(403).send();
        await TeamProposalService.baseApi.delete(id);
        return res.send(teamProposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyTeamProposals(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const pagination:Pagination = extractPagination(req);
        const projects = await TeamProposalService.getMyTeamProposals(user._id, pagination.limit, pagination.page);
        return res.send(projects);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}