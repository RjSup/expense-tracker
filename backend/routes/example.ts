// routes/example.ts
import { Router, Request, Response } from 'express';

const router = Router();

// GET example
router.get('/', (req: Request, res: Response) => {
  res.json({ message: "Hello from backend!" });
});

// POST echo
router.post('/', (req: Request, res: Response) => {
  const { message } = req.body;
  res.json({ message: `You sent: ${message}` });
});

export default router;
