import { Request } from "express";

export const cookieExtractor = (req: Request) => {
    return req.cookies["accessToken"]
}