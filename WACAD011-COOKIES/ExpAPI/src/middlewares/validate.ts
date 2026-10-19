import { type Request, type Response, type NextFunction } from 'express';
import type { Schema } from 'joi';

const validate = (schema: Schema) => {
 return (req: Request, res: Response, next: NextFunction) => {
 const { error } = schema.validate(req.body, {
 abortEarly: false
 });
 if (error) res.status(422).json({ error: error.details });
 else next();
 };
};

export default validate;