import { Request, Response } from "express";
import { ProjectDocument } from "../models/project.model";
import ProjectService from "../services/project.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllProject(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await ProjectService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createProject(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as ProjectDocument;
        data.userId = user.id;
        const response = await ProjectService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateProject(req: Request, res: Response){
    try{
        const data = req.body as ProjectDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await ProjectService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteProject(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await ProjectService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getProject(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await ProjectService.baseApi.get(id, undefined, 'user');
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMyProjects(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const quarryParams = req.query as ListQueryParams;
        const data = await ProjectService.baseApi.list(quarryParams.page, quarryParams.limit, {userId:user.id});
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}