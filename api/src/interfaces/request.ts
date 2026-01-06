import {Request} from 'express'

export interface AuthRequest extends Request {
    isAuthenticated?: boolean
    token?: string
}

export interface PaginatedRequestParams {
    page: number
    limit: number
}
export interface PaginationResult<T> {
    data: T[]
    pagination: {
        total: number
        totalPages: number
        hasNextPage: boolean
        hasPreviousPage: boolean
    } & PaginatedRequestParams
}