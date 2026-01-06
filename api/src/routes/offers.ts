import {And} from 'typeorm'
import {Response, Router} from 'express'
import {getOffers} from '../controllers/offerController'
import {OfferParams, OfferRequest} from '../interfaces/offer'
import {Offer} from '../entities/Offer'
import {FindOptionsWhere} from 'typeorm'
import {FilterService} from '../services/FilterService'
import {paginationService} from '../services/paginationService'
import {handleValidationErrors} from '../middlewares/validationMiddleware'
import {getOffersValidations} from '../validators/offers'
import {matchedData} from 'express-validator'

const router = Router()

// GET /offers - List all offers with pagination
router.get(
    '/',
    ...getOffersValidations,
    handleValidationErrors,
    async (req: OfferRequest, res: Response) => {
        try {
            const {limit, page} = paginationService.getPaginationParams(req.query.page, req.query.limit)

            // Build filters object from query parameters
            const filters: FindOptionsWhere<Offer>[] = []

            filters.push(FilterService.formatStrictFilter<Offer>('nurseId', data.nurseId))
            filters.push(FilterService.formatNumberMinMaxFilter<Offer>(
                'nbDaysMin', 'nbDaysMax', data.nbDaysMin, data.nbDaysMax)
            )
            filters.push(FilterService.formatNumberRangeFilter<Offer>(
                'retrocessionRate', data.retrocessionRateMin, data.retrocessionRateMax)
            )
            filters.push(FilterService.formatNumberRangeFilter<Offer>(
                'averageTechnicalCareDay', data.averageTechnicalCareDayMin, data.averageTechnicalCareDayMax)
            )
            filters.push(FilterService.formatNumberRangeFilter<Offer>(
                'averageKilometersDay', data.averageKilometersDayMin, data.averageKilometersDayMax)
            )
            filters.push(FilterService.formatNumberRangeFilter<Offer>(
                'averageConsultationsDay', data.averageConsultationsDayMin, data.averageConsultationsDayMax)
            )
            const result = await getOffers(page, limit, filters)
            res.json(result)
        } catch (err: any) {
            console.error(err)
            res.status(500).json({error: 'Internal server error'})
        }
    })

export default router
