import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    const authHeader = req.headers.authorization

    // Check if header exists 
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1]

    try {
        const decoded = verifyToken(token)
        req.user = decoded

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
