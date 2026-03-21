import jwt from 'jsonwebtoken'


export const generateAccessToken = (payload: object) =>
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '30m' })

export const generateRefreshToken = (payload: object) =>
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
}