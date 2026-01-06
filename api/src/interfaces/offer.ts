import {Request} from 'express'
import {ParsedQs} from 'qs'
import {PaginatedRequestParams} from './request'

export interface OfferParams extends PaginatedRequestParams {
    nurseId?: string
    period?: [Date, Date]
    nbDaysMin?: number
    nbDaysMax?: number
    retrocessionRateMax?: number
    retrocessionRateMin?: number
    departments?: number[]
    averageTechnicalCareDayMin?: number
    averageTechnicalCareDayMax?: number
    averageKilometersDayMin?: number
    averageKilometersDayMax?: number
    averageConsultationsDayMin?: number
    averageConsultationsDayMax?: number
}

export interface OfferRequest extends Request {
    query: ParsedQs & OfferParams
}
