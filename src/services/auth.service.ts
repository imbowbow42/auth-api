import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { verifyGoogleToken } from '../utils/google.js'


export const loginService = async (data: any) => {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }
    if (!user.password) {
        throw new AppError('Invalid email or password', 401);
    }
    
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    return {
        message: 'Login successful',
        accessToken: generateAccessToken({ userId: user.userId, email: user.email, role: 'user' }),
        refreshToken: generateRefreshToken({ userId: user.userId, email: user.email, role: 'user' })
    };
};

export const registerService = async (data: any) => {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
        throw new AppError('Email already in use', 400);
    }

    const hashedPassword = await hashPassword(data.password);
    const newUser = await userRepository.create({
        username: data.username,
        email: data.email,
        password: hashedPassword
    });

    return {
        message: 'User registered successfully',
        user: { id: newUser!.userId, email: newUser!.email, username: newUser!.username },
        accessToken: generateAccessToken({ userId: newUser!.userId, email: newUser!.email, role: 'user' }),
        refreshToken: generateRefreshToken({ userId: newUser!.userId, email: newUser!.email, role: 'user' })
    };
};

export const googleLoginService = async (idToken: string) => {

    const payload = await verifyGoogleToken(idToken)

    const { sub, email, name } = payload

    if (!email) {
        throw new AppError('Google account has no email', 400)
    }

    // Check if user already exists
    let user = await userRepository.findByGoogleId(sub)

    // If not, create new user
    if (!user) {
        user = await userRepository.create({
            username: name || email,
            email,
            googleId: sub
        })
    }

    // Generate YOUR system token
    const accessToken = generateAccessToken({
        userId: user.userId,
        email: user.email
    })
    const refreshToken = generateRefreshToken({
        userId: user.userId,
        email: user.email
    })

    return { accessToken, refreshToken }
}