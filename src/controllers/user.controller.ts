import { Response } from 'express'
import { AuthRequest } from '../middlewares/auth.middleware.js'

export const getProfile = (req: AuthRequest, res: Response) => {

    return res.json({
        message: 'Profile data',
        user: req.user
    })
}