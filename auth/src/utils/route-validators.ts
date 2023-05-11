import { body } from 'express-validator';

export const signUpValidators = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Password must be between 5 and 20 characters.'),
];
