import {Request, Response, NextFunction} from 'express'
import {blacklistService} from '../services/blacklistService'
import {AuthRequest} from '../interfaces/request'

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req?.headers?.authorization

    if (!authHeader) {
        return res.status(401).json({error: 'No authorization header'})
    }

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({error: 'Invalid authorization header format'})
    }

    const token = parts[1]

    try {
        // Check if token is blacklisted (now async)
        const isBlacklisted = await blacklistService.isBlacklisted(token)
        if (isBlacklisted) {
            return res.status(401).json({error: 'Token has been revoked. Please login again.'})
        }
        req.isAuthenticated = true
        req.token = token
        next()
    } catch (err) {
        return res.status(401).json({error: 'Invalid or expired token'})
    }
}

// Optional auth middleware - doesn't fail if no token, but sets req.isAuthenticated if valid token is present
export const optionalAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req?.headers?.authorization

    req.isAuthenticated = false

    if (authHeader) {
        const parts = authHeader.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
            const token = parts[1]

            try {
                // Check if token is blacklisted
                const isBlacklisted = await blacklistService.isBlacklisted(token)
                if (!isBlacklisted) {
                    req.isAuthenticated = true
                    req.token = token
                }
            } catch (err) {
                // Token is invalid, but we don't fail - just continue as unauthenticated
                req.isAuthenticated = false
            }
        }
    }
    next()
}