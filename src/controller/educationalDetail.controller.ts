import mongoose from "mongoose";
import { Request, Response } from "express";
import EducationalDetailService from "../service/educationalDetail.service";
import { EducationalDetailDocument } from "../model/educationalDetail.model";
import log from "../logger";
import { get } from "lodash";

export async function patchEducationalDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        let data = req.body as EducationalDetailDocument;
        const existingDetail = await EducationalDetailService.baseApi.get(id);
        if(existingDetail === null || existingDetail.userId.toString() !== user._id) return res.status(403).send();
        const educationalDetail = await EducationalDetailService.baseApi.patch(id, data);
        res.send(educationalDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteEducationalDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        const existingDetail = await EducationalDetailService.baseApi.get(id);
        if(existingDetail === null || existingDetail.userId.toString() !== user._id) return res.status(403).send();
        const educationalDetail = await EducationalDetailService.baseApi.delete(id);
        res.send(educationalDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}