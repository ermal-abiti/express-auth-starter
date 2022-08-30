import { body } from 'express-validator';

export const userRegisterValidator = [
    body('username').isLength({min: 5, max: 15}),
    body('password').isLength({min: 8, max: 50}),
    body('email').isEmail(),
];

export const userLoginValidator = [
    body('username').notEmpty(),
    body('password').notEmpty(),
];