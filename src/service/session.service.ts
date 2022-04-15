import config from "config";
import { get } from "lodash";
import Session, { SessionDocument } from "../model/session.model";
import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import { UserDocument } from "../model/user.model";
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent:string) {
    const session = await Session.create({ user: userId, userAgent });
    return session.toJSON();
}

export function createAccessToken({
    user,
    session
}: {
    user:
        | Omit<UserDocument, "password" | "comparePassword">
        | LeanDocument<Omit<UserDocument, "password" | "comparePassword">>;
    session:
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "password">>;
}) {
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
    
    return accessToken;
}

export async function reIssueAccessToken({
    refreshToken
}: {
    refreshToken:string
}) {
    const { decoded } = decode(refreshToken);
    const session = await Session.findById(get(decoded, "_id"));
    if (!session || !session?.valid) return false;
    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = createAccessToken({ user, session });

    return accessToken;
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    return Session.updateOne(query, update);
}
  
export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean();
}
  