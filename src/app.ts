import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


const app = express();

// Middleware
// 1. Security & Parsing Middleware (Runs on every request)
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3300', 'https://kind-ocean-06f7e6b00.4.azurestaticapps.net'],
    credentials: true
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(express.json());

// 2. Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes)

app.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
})

// 3. Error Handling Middleware (Must be last)
app.use(errorMiddleware);

export default app;