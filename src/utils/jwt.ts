import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'masterkey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const generateToken = (payload: object) => {
    const options: SignOptions = {
        expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn']
    };
    return jwt.sign(payload, JWT_SECRET, options);
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}