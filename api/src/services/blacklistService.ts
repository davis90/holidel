import {AppDataSource} from '../db/data-source'
import {TokenBlacklist} from '../entities/TokenBlacklist'

export const blacklistService = {
    // Add token to blacklist
    addToBlacklist: async (token: string, expiresIn: number) => {
        const repo = AppDataSource.getRepository(TokenBlacklist)
        const expiresAt = new Date(Date.now() + expiresIn * 1000)

        const blacklistedToken = repo.create({
            token,
            expiresAt
        })

        await repo.save(blacklistedToken)
    },

    // Check if token is blacklisted
    isBlacklisted: async (token: string): Promise<boolean> => {
        const repo = AppDataSource.getRepository(TokenBlacklist)
        const found = await repo.findOne({where: {token}})
        return !!found
    },

    // Clean up expired tokens from blacklist
    cleanupExpiredTokens: async () => {
        const repo = AppDataSource.getRepository(TokenBlacklist)
        await repo.delete({
            expiresAt: {
                _type: 'timestamptz',
                _value: '< NOW()'
            } as any
        })
    }
}

