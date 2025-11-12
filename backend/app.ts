import express from 'express';
import cors from 'cors';
import exampleRouter from './routes/example';
import { AppError } from './types/error.type';
import authRouter from './routes/auth';

const app = express();

// ⚡ CORS middleware first
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// JSON parser
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send("API running"));

// Routes
app.use('/api/example', exampleRouter);
app.use('/api/echo', exampleRouter);
app.use('/api/auth', authRouter);

// Handle errors
app.use((err: AppError, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

export default app;
