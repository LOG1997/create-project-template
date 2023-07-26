import { NextFunction, Request, Response } from 'express';

export function fileMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.log('😄req:', req.body)
    req['multer'] = { body: req.body };
    next();
}