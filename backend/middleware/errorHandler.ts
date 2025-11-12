import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error.type';

export const errorHandler = (error: AppError, request: Request, response: Response, next: NextFunction) => {
    console.error('error', error.message || error);

    const statusCode = error.statusCode || 500;

    response.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Sevice Error'
    })
}