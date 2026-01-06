import {matchedData, validationResult} from 'express-validator'
import {Request, Response, NextFunction} from 'express'

/**
 * Middleware pour gérer les erreurs de validation
 * Retourne un statut 400 avec les erreurs de validation si présentes
 */
export function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: "param" in err ? err.param : 'path' in err ? err.path : undefined,
                message: err.msg,
                value: 'value' in err ? err.value : undefined
            }))
        })
    }
    const data = matchedData(req, {includeOptionals: true, onlyValidData: true})
    req.query = data
    next()
}