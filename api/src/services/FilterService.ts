import {FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Equal, Between, FindOptionsWhereProperty} from 'typeorm'

export const FilterService = {

    formatNumberRangeFilter<T>(
        paramName: string,
        min?: number,
        max?: number
    ): FindOptionsWhere<T> {
        if (min == undefined && max == undefined) return {}
        if (max == undefined) return {[paramName]: MoreThanOrEqual(min)} as FindOptionsWhere<T>
        if (min == undefined) return {[paramName]: LessThanOrEqual(max)} as FindOptionsWhere<T>
        return {[paramName]: Between(min, max)} as FindOptionsWhere<T>
    },

    formatNumberMinMaxFilter<T>(
        paramNameMin: string,
        paramNameMax: string,
        min?: number,
        max?: number
    ): FindOptionsWhere<T> {
        let filters: FindOptionsWhere<T> = {}
        if (min !== undefined) filters = {...filters, [paramNameMin]: MoreThanOrEqual(min)}
        if (max !== undefined) filters = {...filters, [paramNameMax]: LessThanOrEqual(max)}
        return filters
    },

    formatStrictFilter<T>(
        paramName: string,
        value?: unknown
    ): FindOptionsWhere<T> {
        if (value == undefined) return {}
        return {[paramName]: value} as FindOptionsWhere<T>
    }
}

