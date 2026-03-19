import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service.js';
import { registerSchema, loginSchema } from '../utils/validator.js';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = loginSchema.parse(req.body);
        const result = await authService.loginService(validated);

        res.status(200).json(result);
    } catch (error: any) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = registerSchema.parse(req.body);
        const result = await authService.registerService(validated);
        res.status(201).json(result);
    } catch (error: any) {
        next(error);
    }
};
export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {

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
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        })

    } catch (error: any) {

        next(error);

    }
}

