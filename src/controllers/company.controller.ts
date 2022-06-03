import { Request, Response } from "express";
import { CompanyDocument } from "../models/company.model";
import CompanyService from "../services/company.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllCompany(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await CompanyService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createCompany(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as CompanyDocument;
        data.userId = user.id;
        const response = await CompanyService.createOrUpdateCompany(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateCompany(req: Request, res: Response){
    try{
        const data = req.body as CompanyDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await CompanyService.createOrUpdateCompany(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteCompany(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await CompanyService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getCompany(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await CompanyService.baseApi.get(id, undefined, 'address');
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}