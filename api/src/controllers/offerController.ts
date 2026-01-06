import {AppDataSource} from '../db/data-source'
import {Offer} from '../entities/Offer'
import {paginationService} from '../services/paginationService'
import {PaginationResult} from '../interfaces/request'
import {And, FindOptionsWhere} from 'typeorm'

export async function getOffers(
    page: number = 1,
    limit: number = 10,
    filters?: FindOptionsWhere<Offer>[]
): Promise<PaginationResult<Offer>> {
    const repo = AppDataSource.getRepository(Offer)
    const offset: number = (page - 1) * limit
    const reqFilters = filters?.reduce((acc, filter) => ({...acc, ...filter}), {})

    const [offers, total] = await repo.findAndCount({
        skip: offset,
        take: limit,
        where: reqFilters
    })

    return paginationService.formatResponse(offers, total, page, limit)
}