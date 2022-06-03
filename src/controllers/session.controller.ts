import config from "config";
import { validatePassword, CreateSession, getUserByEmail, createUser } from "../services/user.service";
import { Request, Response } from "express";
import log from "../logger";
import { createAccessToken, createSession, getUserSessions, reIssueAccessToken } from "../services/session.service";
import { sign } from "../utils/jwt.utils";
import { get } from "lodash";

const { OAuth2Client } = require('google-auth-library')

const googleClientId = config.get("googleClientId");

const googleClient = new OAuth2Client(googleClientId);

export async function createUserSessionHandler(req: Request, res: Response) {
    try{
        const user = await validatePassword(req.body);    
        if(!user) return res.status(401).send("Invalid usename or password");
        const session = await createSession(user.id, req.get("user-agent") || "unknown");
        
        const accessToken = createAccessToken({
            user, session
        })

        const refreshToken = sign(session, {
            expiresIn: config.get("refreshTokenTtl")
        })

        return res.send({accessToken, refreshToken, user});
    }catch (e) {
        log.error(e);
        return res.status(401).send("Invalid usename or password");
    }
}

export async function createSessionWithGoogle(req: Request, res:Response){
    try{
        const { tokenId } = req.body;
        const ticket = await googleClient.verifyIdToken({
            idToken: tokenId,
            audience: googleClientId
        })
        const { name, email, picture }: { name: string, email: string, picture: string } = ticket.getPayload();
        let user = await getUserByEmail(email);
        if(!user) {
            user = await createUser({name, email, image:picture});
        }
        const session = await createSession(user._id, req.get("user-agent") || "unknown");
        const accessToken = createAccessToken({
            user,
            session
        })
        const refreshToken = sign(session, {
            expiresIn: config.get("refreshTokenTtl"),
        });

        return res.send({ accessToken, refreshToken, user });
    }catch (e) {
        log.error(e);
        return res.status(409).send(e)
    }
}

export async function createAccessTokenWithRefreshToken(req: Request, res: Response) {
    try{
        const { refreshToken } = req.body;
        const newAccessToken = await reIssueAccessToken({ refreshToken });
    
        if (newAccessToken) {
            return res.send({ accessToken: newAccessToken })
        }
    
        return res.status(403).send();
    }catch (e) {
        log.error(e);
        return res.status(403).send();
    }
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
    
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    try{
        const userId = get(req, "user.id");
        const sessions = await getUserSessions(userId);
        return res.send(sessions);
    }catch (e) {
        log.error(e);
        return res.status(403).send();
    }
}