import {AppDataSource} from '../db/data-source'
import {Nurse, NurseStatus} from '../entities/Nurse'
import {PaginationResult} from '../interfaces/request'
import {paginationService} from '../services/paginationService'

export async function getNurses(isAuthenticated: boolean, page: number = 1, limit: number = 10): Promise<PaginationResult<Nurse>> {
    const repo = AppDataSource.getRepository(Nurse)
    const offset = (page - 1) * limit

    const [nurses, total] = await repo.findAndCount({
        relations: {
            offers: isAuthenticated,
            certificates: isAuthenticated,
            diplomas: isAuthenticated,
        },
        skip: offset,
        take: limit,
        order: {
            createdAt: 'DESC'
        }
    })

    return paginationService.formatResponse(nurses, total, page, limit)
}

export async function getNurseById(id: string): Promise<Nurse | null> {
    const repo = AppDataSource.getRepository(Nurse)
    return await repo.findOne({
        where: {id},
        relations: {
            offers: true,
            certificates: true,
            diplomas: true,
        }
    })
}

