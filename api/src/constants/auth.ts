import * as jwt from 'jsonwebtoken'

export const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET ?? 'your_secret_key'
export const JWT_EXPIRE: number = Math.round(Number(process.env.JWT_EXPIRE)) || 43200
