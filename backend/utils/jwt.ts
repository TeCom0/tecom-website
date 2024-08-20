import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const GenerateWebToken = (payload: string, SecretKey: string) => {

    return jwt.sign({ memberId: payload }, SecretKey, { expiresIn: '15min', algorithm: 'HS384' })
}

export const GenerateRefreshToken = (payload: string, SecretKey: string) => {

    return jwt.sign({ memberId: payload }, SecretKey, { expiresIn: '1h', algorithm: 'HS384' })
}

export const VerifyToken = (ReqToken: string, Key: string): JwtPayload | string => {
    try {
        return jwt.verify(ReqToken, Key) as JwtPayload;
    } catch (err) {
        throw new Error('Token Do Not Match, This Request Cannot Be Trusted');
    }
};