import { Request, Response } from 'express';
import { getHelloMessage } from '../models/exampleModel';

export const sendHello = (req: Request, res: Response) => {
  const message = getHelloMessage();
  res.json({ message });
};
