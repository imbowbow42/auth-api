// Simulated database table
// Later this will be Azure SQL
import { container, database } from '../config/cosmos.js'
interface User {
    userId: string
    username: string
    email: string
    password?: string // hashed password
    googleId?: string
}
export const userRepository = {
    findByEmail: async (email: string) => {
        const query = {
            query: 'SELECT TOP 1 * FROM c WHERE c.email = @email',
            parameters: [
                {
                    name: '@email',
                    value: email
                }
            ]
        }
        const { resources: users } = await container.items.query(query, { maxItemCount: 1 }).fetchAll()
        return users[0]
    },
    findByGoogleId: async (googleId: string) => {
        const query = {
            query: 'SELECT TOP 1 * FROM c WHERE c.googleId = @googleId',
            parameters: [
                {
                    name: '@googleId',
                    value: googleId
                }
            ]
        }
        const { resources: users } = await container.items.query(query, { maxItemCount: 1 }).fetchAll()
        return users[0]
    },

    create: async (data: Omit<User, 'userId'>) => {
        const newUser: User = {
            userId: crypto.randomUUID(),
            ...data
        }
        const { resource } = await container.items.create(newUser)
        return resource
    }
}