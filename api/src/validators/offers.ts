import {query} from 'express-validator'
import {paginationValidations} from './paginations'
import {parse} from 'path'

/**
 * Validations pour les filtres des offres
 */
export const getOffersValidations = [
  ...paginationValidations,
  query('nurseId')
    .optional()
    .isUUID()
    .withMessage('nurseId doit être un UUID valide'),
  query('nbDaysMin')
    .optional()
    .isInt({min: 1})
    .toInt()
    .withMessage('nbDaysMin doit être un entier positif'),
  query('nbDaysMax')
    .optional()
    .isInt({min: 1})
    .toInt()
    .withMessage('nbDaysMax doit être un entier positif'),
  query('retrocessionRateMin')
    .optional()
    .isInt({min: 0, max: 100})
    .toInt()
    .withMessage('retrocessionRateMin doit être entre 0 et 100'),
  query('retrocessionRateMax')
    .optional()
    .isInt({min: 0, max: 100})
    .toInt()
    .withMessage('retrocessionRateMax doit être entre 0 et 100'),
  query('averageTechnicalCareDayMin')
    .optional()
    .isInt({min: 0})
    .toInt()
    .withMessage('averageTechnicalCareDayMin doit être un nombre positif'),
  query('averageTechnicalCareDayMax')
    .optional()
    .isInt({min: 0})
    .toInt()
    .withMessage('averageTechnicalCareDayMax doit être un nombre positif'),
  query('averageKilometersDayMin')
    .optional()
    .isInt({min: 0})
    .toInt()
    .withMessage('averageKilometersDayMin doit être un nombre positif'),
  query('averageKilometersDayMax')
    .optional()
    .isInt({min: 0})
    .toInt()
    .withMessage('averageKilometersDayMax doit être un nombre positif'),
  query('averageConsultationsDayMin')
    .optional()
    .isInt({min: 0})
    .toInt()
    .withMessage('averageConsultationsDayMin doit être un nombre positif'),
  query('averageConsultationsDayMax')
    .optional()
    .isInt({min: 0})
    .toInt()
    .withMessage('averageConsultationsDayMax doit être un nombre positif')
  , query('departments')
    .optional()
    .custom((arr) => Array.isArray(arr) ? arr.every((num: string) => parseInt(num) > 0) : parseInt(arr) > 0)
    .customSanitizer((arr) => Array.isArray(arr) ? arr.map((num: string) => parseInt(num)) : [parseInt(arr)])
    .withMessage('Chaque département doit être un nombre entier positif')
]
