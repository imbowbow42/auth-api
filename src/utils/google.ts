import { OAuth2Client } from 'google-auth-library'

// Initialize the Google OAuth2 client with the application's client ID from environment variables
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

/**
 * Verifies a Google ID token and returns the decoded payload.
 * Useful for authenticating users who log in with Google.
 * 
 * @param idToken The JWT ID token received from the Google sign-in flow on the client
 * @returns The decoded user information from the token payload
 * @throws Error if the token is invalid or cannot be verified
 */
export const verifyGoogleToken = async (idToken: string) => {

    // Verify the token signature and ensure it's intended for our application (audience)
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    // Extract the user informaton payload from the verified ticket
    const payload = ticket.getPayload()

    if (!payload) {
        throw new Error('Invalid Google token')
    }

    // Return the user data (like email, profile picture, name, etc.)
    return payload
}
