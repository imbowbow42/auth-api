import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';

export const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginService(req.body);

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const result = await authService.registerService(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
export const googleLogin = async (req: Request, res: Response) => {

    try {

        const { idToken } = req.body

        if (!idToken) {
            return res.status(400).json({
                message: 'Google token required'
            })
        }

        const result = await authService.googleLoginService(idToken)

        return res.json({
            message: 'Google login successful',
            token: result.token
        })

    } catch (error: any) {

        return res.status(401).json({
            message: error.message
        })

    }
}

