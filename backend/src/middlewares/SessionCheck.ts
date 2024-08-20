import { Request, Response, NextFunction } from 'express'
import { GenerateWebToken, VerifyToken } from '../../utils/jwt';
import dotenv from 'dotenv'
import { JwtPayload } from 'jsonwebtoken';
dotenv.config()
export function CheckSession(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies?.accessToken
    const refreshToken = req.cookies?.refreshToken
    if (!accessToken) {
        if (refreshToken) {
            try {
                const decoded = VerifyToken(refreshToken, process.env.REFRESH_PRIVATE_KEY!) as JwtPayload
                res.cookie('accessToken', GenerateWebToken(decoded.memberId as string, process.env.ACCESS_PRIVATE_KEY!), { httpOnly: true });

                return next();
            } catch (error) {
                return res.status(401).send("Due to Security Concerns, You Will have login again");
            }
        } else {
            return res.status(401).send("Due to Security Concerns, You Will have login again");
        }
    }
    next()
}