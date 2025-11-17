import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Auth routes
app.use('/api/auth', authRouter);

export default app;
