import express from 'express';
import cors from 'cors';
// import exampleRouter from './routes/example';
import authRouter from './routes/auth';

const app = express();

// ⚡ CORS middleware first
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// JSON parser
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send("API running"));

// Routes
// app.use('/api/example', exampleRouter);
// app.use('/api/echo', exampleRouter);
app.use('/api/auth', authRouter);

export default app;
