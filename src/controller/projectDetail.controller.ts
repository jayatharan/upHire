import mongoose from "mongoose";
import { Request, Response } from "express";
import ProjectDetailService from "../service/projectDetail.service";
import { ProjectDetailDocument } from "../model/projectDetail.model";
import log from "../logger";
import { get } from "lodash";

export async function patchProjectDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        let data = req.body as ProjectDetailDocument;
        const existingDetail = await ProjectDetailService.baseApi.get(id);
        if(existingDetail === null || existingDetail.user.toString() !== user._id) return res.status(403).send();
        const projectDetail = await ProjectDetailService.baseApi.patch(id, data);
        res.send(projectDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteProjectDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        const existingDetail = await ProjectDetailService.baseApi.get(id);
        if(existingDetail === null || existingDetail.user.toString() !== user._id) return res.status(403).send();
        const projectDetail = await ProjectDetailService.baseApi.delete(id);
        res.send(projectDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}