import { Response } from 'express'
import { AuthRequest } from '../middlewares/auth.middleware.js'
import { userRepository } from '../repositories/user.repository.js'


export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await userRepository.findByEmail(req.user.email)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.json({
            message: 'Profile data',
            user: {
                userId: user.userId,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch profile' })
    }
}