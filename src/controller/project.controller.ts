import mongoose from "mongoose";
import { Request, Response } from "express";
import ProjectService from "../service/project.service";
import ProposalService from "../service/proposal.service";
import { ProjectDocument } from "../model/project.model";
import { ProposalDocument } from "../model/proposal.model";
import log from "../logger";
import { get } from "lodash";
import { Pagination, extractPagination } from "../utils/query.utils";

export async function getAllProjects(req: Request, res: Response) {
    try{
        const pagination:Pagination = extractPagination(req);
        const projects = await ProjectService.baseApi.list(pagination.limit, pagination.page)
        return res.send(projects)
    } catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createProject(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as ProjectDocument;
        data.userId = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        const project = await ProjectService.baseApi.create(data);
        res.send(project);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getProjectById(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const project = await ProjectService.baseApi.get(id);
        res.send(project);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function patchProject(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        let data = req.body as ProjectDocument;
        const project = await ProjectService.baseApi.patch(id, data);
        res.send(project);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteProject(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const project = await ProjectService.baseApi.get(id);
        await project?.remove();
        res.send(project);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function addProjectProposal(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        let data = req.body as ProposalDocument;
        data.userId = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        data.projectId = id;
        const proposal = await ProposalService.baseApi.create(data);
        res.send(proposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyProjects(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const pagination:Pagination = extractPagination(req);
        const projects = await ProjectService.getMyProjects(user._id, pagination.limit, pagination.page);
        return res.send(projects);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getAllProjectProposals(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const pagination:Pagination = extractPagination(req);
        const proposals = await ProjectService.getAllProjectProposals(pagination.limit, pagination.page, id);
        return res.send(proposals)
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}