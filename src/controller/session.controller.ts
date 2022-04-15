import config from "config";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
    createSession,
    createAccessToken,
    findSessions,
    updateSession
} from "../service/session.service";
import { sign } from "../utils/jwt.utils";
import { get } from "lodash";
import log from "../logger";
import User from "../model/user.model";

const { OAuth2Client } = require('google-auth-library')

const googleClientId = config.get("googleClientId");

const googleClient = new OAuth2Client(googleClientId);

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    if(!user) {
        return res.status(401).send("Invalid usename or password");
    }

    const session = await createSession(user._id, req.get("user-agent") || "unknown");

    const accessToken = createAccessToken({
        user,
        session
    })

    const refreshToken = sign(session, {
        expiresIn: config.get("refreshTokenTtl"), // 1 year
    });

    return res.send({ accessToken, refreshToken });
}

export async function createSessionWithGoogle(req:Request, res:Response) {
    try{
        const {tokenId} = req.body;
        const ticket = await googleClient.verifyIdToken({
            idToken: tokenId,
            audience: googleClientId
        })

        const { name, email } = ticket.getPayload();

        var user = await User.findOne({email})

        if(!user) {
            user = await User.create({username:name, email})
        }

        const session = await createSession(user._id, req.get("user-agent") || "unknown");

        const accessToken = createAccessToken({
            user,
            session
        })

        const refreshToken = sign(session, {
            expiresIn: config.get("refreshTokenTtl"), // 1 year
        });

        return res.send({ accessToken, refreshToken });
    } catch (e) {
        log.error(e);
        return res.status(409).send(e)
    }
}

export async function invalidateUserSessionHandler(
    req: Request,
    res: Response
) {
    const sessionId = get(req, "user.session");
  
    await updateSession({ _id: sessionId }, { valid: false });
  
    return res.sendStatus(200);
}
  
export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
  
    const sessions = await findSessions({ user: userId, valid: true });
  
    return res.send(sessions);
}