// Simulated database table
// Later this will be Azure SQL

interface User {
    id: number
    username: string
    email: string
    password: string // hashed password
}

let users: User[] = []
let idCounter = 1

export const userRepository = {
    findByEmail: (email: string) => {
        return users.find(user => user.email === email)
    },

    create: (data: Omit<User, 'id'>) => {
        const newUser: User = {
            id: idCounter++,
            ...data
        }
        users.push(newUser)
        return newUser
    }
}