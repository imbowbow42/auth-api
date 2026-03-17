
import { userRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';
import { verifyGoogleToken } from '../utils/google.js'


export const loginService = async (data: any) => {
    const user = userRepository.findByEmail(data.email);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    if (user.password) {
        const isPasswordValid = await comparePassword(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
    }

    return {
        message: 'Login successful',
        token: generateToken({ userId: user.id, email: user.email })
    };
};

export const registerService = async (data: any) => {
    const existingUser = userRepository.findByEmail(data.email);
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await hashPassword(data.password);
    const newUser = userRepository.create({
        username: data.username,
        email: data.email,
        password: hashedPassword
    });

    return {
        message: 'User registered successfully',
        user: { id: newUser.id, email: newUser.email, username: newUser.username }
    };
};

export const googleLoginService = async (idToken: string) => {

    const payload = await verifyGoogleToken(idToken)

    const { sub, email, name } = payload

    if (!email) {
        throw new Error('Google account has no email')
    }

    // Check if user already exists
    let user = userRepository.findByGoogleId(sub)

    // If not, create new user
    if (!user) {
        user = userRepository.create({
            username: name || email,
            email,
            googleId: sub
        })
    }

    // Generate YOUR system token
    const token = generateToken({
        userId: user.id,
        email: user.email
    })

    return { token }
}