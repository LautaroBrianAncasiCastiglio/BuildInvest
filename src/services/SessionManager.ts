import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const COOKIE_SESSION_NAME = "session";

type SessionPayload = {
    email: string;
    expiresAt: Date;
};

class SessionManager {
    static async encrypt(payload: SessionPayload) {
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(encodedKey);
    }

    static async decrypt(session: string | undefined = "") {
        try {
            const { payload } = await jwtVerify<SessionPayload>(
                session,
                encodedKey,
                {
                    algorithms: ["HS256"],
                },
            );
            return payload;
        } catch (error) {
            console.error(error);
        }
    }

    static async createSession(email: string) {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const session = await SessionManager.encrypt({
            email,
            expiresAt,
        });

        cookies().set(COOKIE_SESSION_NAME, session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/",
        });
    }

    static deleteSession() {
        cookies().delete(COOKIE_SESSION_NAME);
    }

    static verifySession = cache(async () => {
        const cookie = cookies().get("session")?.value;
        if (!cookie) return { isAuth: false };
        const session = await SessionManager.decrypt(cookie);

        if (!session?.email) {
            return { isAuth: false };
        }

        return { isAuth: true, email: session.email };
    });
}

export default SessionManager;
