import config from "config";
import { Request, Response } from "express";
import { validatePassword, findUserById, findUser, createUser } from "../service/user.service";
import {
    createSession,
    createAccessToken,
    findSessions,
    updateSession,
    reIssueAccessToken
} from "../service/session.service";
import { sign } from "../utils/jwt.utils";
import { get } from "lodash";
import log from "../logger";

const { OAuth2Client } = require('google-auth-library')

const googleClientId = config.get("googleClientId");

const googleClient = new OAuth2Client(googleClientId);

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    if (!user) {
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

    return res.send({ accessToken, refreshToken, user });
}

export async function createSessionWithGoogle(req: Request, res: Response) {
    try {
        const { tokenId } = req.body;
        const ticket = await googleClient.verifyIdToken({
            idToken: tokenId,
            audience: googleClientId
        })

        const { name, email, picture }: { name: string, email: string, picture: string } = ticket.getPayload();

        var user = await findUser({ email })

        if (!user) {
            user = await createUser({ name: name, email: email, image:picture })
        }

        const session = await createSession(user._id, req.get("user-agent") || "unknown");

        const accessToken = createAccessToken({
            user,
            session
        })

        const refreshToken = sign(session, {
            expiresIn: config.get("refreshTokenTtl"), // 1 year
        });

        return res.send({ accessToken, refreshToken, user });
    } catch (e) {
        log.error(e);
        return res.status(409).send(e)
    }
}

export async function createAccessTokenWithRefreshToken(req: Request, res: Response) {

    const { refreshToken } = req.body;

    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
        return res.send({ accessToken: newAccessToken })
    }

    return res.status(403).send();
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