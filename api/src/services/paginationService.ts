import {PaginationValues, PaginationResult} from '../interfaces/request'

export const paginationService = {
    // Formater la réponse paginée
    formatResponse: <T>(data: T[], total: number, page: number, limit: number): PaginationResult<T> => {
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage,
                hasPreviousPage
            }
        };
    }
};
