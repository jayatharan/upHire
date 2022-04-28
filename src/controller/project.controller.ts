import { Request, Response } from "express";
import ProjectService from "../service/project.service";
import { ProjectDocument } from "../model/project.model";
import log from "../logger";
import { get } from "lodash";

interface Pagination {
    page: string;
    limit: string;
}

export async function getAllProjects(req: Request, res: Response) {
    try{
        const { page = '1' , limit = '100' } = req.query as unknown as Pagination;
        const projects = await ProjectService.baseApi.list(Number.parseInt(limit), Number.parseInt(page))
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
        data.user = user._id;
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