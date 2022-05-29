import mongoose from "mongoose";
import { Request, Response } from "express";
import JobProposalService from "../service/jobProposal.service";
import { JobProposalDocument } from "../model/jobProposal.model";
import log from "../logger";
import { get } from "lodash";
import { Pagination, extractPagination } from "../utils/query.utils";

export async function getAllJobProposals(req: Request, res: Response) {
    try{
        const pagination:Pagination = extractPagination(req);
        const jobproposals = await JobProposalService.baseApi.list(pagination.limit, pagination.page)
        return res.send(jobproposals)
    } catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createJobProposal(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as JobProposalDocument;
        data.userId = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        const jobproposal = await JobProposalService.baseApi.create(data);
        return res.send(jobproposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getJobProposalById(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const jobproposal = await JobProposalService.baseApi.get(id);
        return res.send(jobproposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function patchJobProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        let data = req.body as JobProposalDocument;
        const existingJobProposal = await JobProposalService.baseApi.get(id);
        if(existingJobProposal === null || existingJobProposal.userId.toString() !== user._id) return res.status(403).send();
        const jobproposal = await JobProposalService.baseApi.patch(id, data);
        return res.send(jobproposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteJobProposal(req: Request, res: Response){
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        const jobproposal = await JobProposalService.baseApi.get(id);
        if(jobproposal === null || jobproposal.userId.toString() === user._id) return res.status(403).send();
        await JobProposalService.baseApi.delete(id);
        return res.send(jobproposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyJobProposals(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const pagination:Pagination = extractPagination(req);
        const projects = await JobProposalService.getMyJobProposals(user._id, pagination.limit, pagination.page);
        return res.send(projects);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}