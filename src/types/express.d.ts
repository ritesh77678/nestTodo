import {JwtPayload} from 'jsonwebtoken'
import { Request } from 'express'

interface jwtPayloadInterface {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            user: jwtPayloadInterface
        }
    }
}

export {}