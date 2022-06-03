import db from '../models';
import config from "config";
import { sign, decode } from "../utils/jwt.utils";
import { SessionDocument } from '../models/session.model';
import { get } from "lodash";
import { getUserById } from './user.service';

const Session = db.Session;

export async function getSessionById(id:string) {
    return (await Session.findByPk(id)); 
}

export async function createSession(userId:string, userAgent:string) {
    const session = await Session.create({ userId, userAgent });
    return session.toJSON();
}

export function createAccessToken({
    user, session
}:{user: |Omit<any, "password">, session:SessionDocument})
{
    const accessToken = sign(
        {...user, session:session.id},
        { expiresIn: config.get("accessTokenTtl") }
    )

    return accessToken;
}

export async function reIssueAccessToken({
    refreshToken
}:{
    refreshToken:string
}){
    const { decoded } = decode(refreshToken);
    const session = await getSessionById(get(decoded, "id"))
    if(!session || !session.dataValues.valid) return false;
    const user = await getUserById(session.userId);
    if(!user) return false;
    const accessToken = createAccessToken({user, session})
    return accessToken;
}

export async function updateSession(id:string, session:SessionDocument) {
    return await Session.update(session,{
        where:{id}
    })
}

export async function getUserSessions(userId:string) {
    return await Session.findAll({
        where:{
            userId,
            valid:true
        }
    })
}