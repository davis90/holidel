export interface Nurse {
    authorizedDepartment: number[]
}

export interface Offer {
    nurse?: Nurse
    period: [string, string]
    nbDaysMin: number
    nbDaysMax: number
    retrocessionRate: number
    averageTechnicalCareDay: number
    averageKilometersDay: number
    averageConsultationsDay: number
    createdAt: string
    updatedAt: string
}

export interface OffersResponse {
    data: Offer[]
    pagination: {
        total: number
        totalPages: number
        hasNextPage: boolean
        hasPreviousPage: boolean
        limit: number
        page: number
    }
}

export interface OfferFilters {
    nurseId?: string
    nbDaysMin?: number
    nbDaysMax?: number
    retrocessionRateMin?: number
    retrocessionRateMax?: number
    averageTechnicalCareDayMin?: number
    averageTechnicalCareDayMax?: number
    averageKilometersDayMin?: number
    averageKilometersDayMax?: number
    averageConsultationsDayMin?: number
    averageConsultationsDayMax?: number
    departments?: number[]
    page?: number
    limit?: number
}
