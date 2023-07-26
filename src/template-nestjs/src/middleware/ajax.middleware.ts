import { NextFunction, Request, Response } from 'express';

export function ajaxMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.log('经过函数式中间件');
    next();
}