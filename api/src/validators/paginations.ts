import {query} from 'express-validator'

/**
 * Validations pour la pagination
 */
export const paginationValidations = [
    query('page')
        .optional()
        .isInt({min: 1})
        .withMessage('page doit être un entier positif'),
    query('limit')
        .optional()
        .isInt({min: 1, max: 100})
        .withMessage('limit doit être un entier entre 1 et 100')
]
