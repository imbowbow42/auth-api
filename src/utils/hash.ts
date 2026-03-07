import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10 // cost factor

export const hashPassword = async (password: string) => {
    // bcrypt automatically adds salt
    return bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    return bcrypt.compare(password, hashedPassword)
}