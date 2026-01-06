import type {OfferFilters, OffersResponse} from '../types/offer'
import type {Offer} from '../types/offer'

// En dev, utilise le proxy Vite (vite.config.ts)
// En prod, utilise l'URL configurée via .env
const API_BASE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL || 'http://localhost:4000'
    : '/api'

export class OfferService {
    static async getOffers(filters: OfferFilters = {}): Promise<OffersResponse> {
        const params = new URLSearchParams()

        // Add pagination
        if (filters.page) params.append('page', filters.page.toString())
        if (filters.limit) params.append('limit', filters.limit.toString())

        // Add filter parameters
        if (filters.nurseId) params.append('nurseId', filters.nurseId)
        if (filters.nbDaysMin !== undefined) params.append('nbDaysMin', filters.nbDaysMin.toString())
        if (filters.nbDaysMax !== undefined) params.append('nbDaysMax', filters.nbDaysMax.toString())
        if (filters.retrocessionRateMin !== undefined)
            params.append('retrocessionRateMin', filters.retrocessionRateMin.toString())
        if (filters.retrocessionRateMax !== undefined)
            params.append('retrocessionRateMax', filters.retrocessionRateMax.toString())
        if (filters.averageTechnicalCareDayMin !== undefined)
            params.append('averageTechnicalCareDayMin', filters.averageTechnicalCareDayMin.toString())
        if (filters.averageTechnicalCareDayMax !== undefined)
            params.append('averageTechnicalCareDayMax', filters.averageTechnicalCareDayMax.toString())
        if (filters.averageKilometersDayMin !== undefined)
            params.append('averageKilometersDayMin', filters.averageKilometersDayMin.toString())
        if (filters.averageKilometersDayMax !== undefined)
            params.append('averageKilometersDayMax', filters.averageKilometersDayMax.toString())
        if (filters.averageConsultationsDayMin !== undefined)
            params.append('averageConsultationsDayMin', filters.averageConsultationsDayMin.toString())
        if (filters.averageConsultationsDayMax !== undefined)
            params.append('averageConsultationsDayMax', filters.averageConsultationsDayMax.toString())
        if (filters.departments && filters.departments.length > 0) {
            filters.departments.forEach((dept) => params.append('departments', dept.toString()))
        }

        const url = `${API_BASE_URL}/offers?${params.toString()}`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }
}
