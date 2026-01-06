import {query} from 'express-validator'

/**
 * Validations pour la pagination
 */
export const paginationValidations = [
    query('page')
        .optional()
        .isInt({min: 1})
        .toInt()
        .withMessage('page doit être un entier positif'),
    query('limit')
        .optional()
        .isInt({min: 1, max: 100})
        .toInt()
        .withMessage('limit doit être un entier entre 1 et 100')
]
