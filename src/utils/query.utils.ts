import { Request, Response } from "express";

export interface PaginationString {
    page:string;
    limit:string;
}

export interface Pagination {
    page:number;
    limit:number;
}

export const extractPagination = (req:Request, pageDefault:string = '1', limitDefault:string = '100'):Pagination => {
    try{
        const { page = pageDefault , limit = limitDefault } = req.query as unknown as PaginationString;
        return {page: Number.parseInt(page), limit:Number.parseInt(limit)}
    }catch (e){
        return {page: Number.parseInt(pageDefault), limit:Number.parseInt(limitDefault)}
    }
}