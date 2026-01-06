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

const router = Router()

// GET /offers - List all offers with pagination
router.get(
    '/',
    ...getOffersValidations,
    handleValidationErrors,
    async (req: OfferRequest, res: Response) => {
        try {
            // Build filters object from query parameters
            const filters: FindOptionsWhere<Offer>[] = []

            filters.push(FilterService.formatStrictFilter<Offer>('nurseId', req.query.nurseId))
            filters.push(FilterService.formatNumberMinMaxFilter<Offer>(
                'nbDaysMin', 'nbDaysMax', req.query.nbDaysMin, req.query.nbDaysMax)
            )
            filters.push(FilterService.formatNumberRangeFilter<Offer>(
                'retrocessionRate', req.query.retrocessionRateMin, req.query.retrocessionRateMax)
            )
            filters.push(FilterService.formatNumberRangeFilter<Offer>(
                'averageTechnicalCareDay', req.query.averageTechnicalCareDayMin, req.query.averageTechnicalCareDayMax)
            )
            filters.push(FilterService.formatNumberRangeFilter<Offer>(
                'averageKilometersDay', req.query.averageKilometersDayMin, req.query.averageKilometersDayMax)
            )
            filters.push(FilterService.formatNumberRangeFilter<Offer>(
                'averageConsultationsDay', req.query.averageConsultationsDayMin, req.query.averageConsultationsDayMax)
            )
            const filterDepartments = FilterService.formatArrayContains<Offer, number>(
                'authorizedDepartment', req.query.departments)
            if (filterDepartments) {
                filters.push({nurse: filterDepartments})
            }
            const result = await getOffers(req.query.page, req.query.limit, filters)
            res.json(result)
        } catch (err: any) {
            console.error(err)
            res.status(500).json({error: 'Internal server error'})
        }
    })

export default router
