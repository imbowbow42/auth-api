import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { userRepository } from '../repositories/user.repository.js';

// Mock the user repository to prevent actual DB calls
vi.mock('../repositories/user.repository.js', () => ({
    userRepository: {
        findByEmail: vi.fn(),
        findByGoogleId: vi.fn(),
        create: vi.fn(),
    }
}));

describe('Authentication API', () => {
    describe('POST /auth/login', () => {
        it('should return 401 when a Google authenticated user tries to login with a standard password', async () => {
            // Arrange
            const mockGoogleUser = {
                userId: '12345',
                email: 'googleuser@example.com',
                username: 'Google User',
                googleId: 'google-id-123',
                // Notice there is NO password field here
            };

            // Setup the mock to return our Google user
            vi.mocked(userRepository.findByEmail).mockResolvedValue(mockGoogleUser as any);

            // Act
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'googleuser@example.com',
                    password: 'someArbitraryPassword123',
                });

            // Assert
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Invalid email or password');
            // We should guarantee that the repository was called
            expect(userRepository.findByEmail).toHaveBeenCalledWith('googleuser@example.com');
        });
    });
});
