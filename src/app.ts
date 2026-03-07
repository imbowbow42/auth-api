import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
})

export default app;