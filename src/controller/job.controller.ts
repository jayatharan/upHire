import mongoose from "mongoose";
import { Request, Response } from "express";
import JobService from "../service/job.service";
import { JobDocument } from "../model/job.model"
import log from "../logger";
import { get } from "lodash";
import { Pagination, extractPagination } from "../utils/query.utils";
import JobProposalService from "../service/jobProposal.service";
import { JobProposalDocument } from "../model/jobProposal.model";

export async function getAllJobs(req: Request, res: Response) {
    try{
        const pagination:Pagination = extractPagination(req);
        const jobs = await JobService.baseApi.list(pagination.limit, pagination.page)
        return res.send(jobs)
    } catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createJob(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as JobDocument;
        data.userId = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        const job = await JobService.baseApi.create(data);
        res.send(job);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getJobById(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const job = await JobService.baseApi.get(id);
        res.send(job);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function patchJob(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        let data = req.body as JobDocument;
        const job = await JobService.baseApi.patch(id, data);
        res.send(job);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteJob(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const Job = await JobService.baseApi.get(id);
        await Job?.remove();
        res.send(Job);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyJobs(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const pagination:Pagination = extractPagination(req);
        const jobs = await JobService.getMyJobs(user._id, pagination.limit, pagination.page);
        return res.send(jobs);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}


export async function addJobProposal(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        let data = req.body as JobProposalDocument;
        data.userId = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        data.jobId = id;
        const proposal = await JobProposalService.baseApi.create(data);
        res.send(proposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}


export async function getAllJobProposals(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const pagination:Pagination = extractPagination(req);
        const proposals = await JobService.getAllJobProposals(pagination.limit, pagination.page, id);
        return res.send(proposals)
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}