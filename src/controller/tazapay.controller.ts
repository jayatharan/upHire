import { Request, Response } from "express";
import { createUser, getUserById, updateUser } from "../service/tazapay.service";
import log from "../logger";

export async function createTazapayUser(req: Request, res: Response) {
  try{
    const userData = req.body;
    let tazapayUser = await createUser(userData);
    return res.send(tazapayUser);
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}

export async function getTazapayUserById(req: Request, res: Response) {
  try{
    const id = req.params.id as string;
    let tazapayUser = await getUserById(id);
    return res.send(tazapayUser); 
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}