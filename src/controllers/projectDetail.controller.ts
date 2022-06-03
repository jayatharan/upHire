import { Request, Response } from "express";
import { ProjectDetailDocument } from "../models/projectDetail.model";
import ProjectDetailService from "../services/projectDetail.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllProjectDetail(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await ProjectDetailService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createProjectDetail(req: Request, res: Response){
    try{
        const data = req.body as ProjectDetailDocument;
        const response = await ProjectDetailService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateProjectDetail(req: Request, res: Response){
    try{
        const data = req.body as ProjectDetailDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await ProjectDetailService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteProjectDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await ProjectDetailService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getProjectDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await ProjectDetailService.baseApi.get(id, undefined, 'user');
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}