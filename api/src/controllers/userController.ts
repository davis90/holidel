import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken/index.js'
import {AppDataSource} from '../db/data-source'
import {User} from '../entities/User'
import {Nurse} from '../entities/Nurse'
import {JWT_EXPIRE, JWT_SECRET} from '../constants/auth'
import {blacklistService} from '../services/blacklistService'

export async function register(nurse: Nurse, password: string): Promise<void> {
    const userRepo = AppDataSource.getRepository(User)
    const nurseRepo = AppDataSource.getRepository(Nurse)

    // Check if user already exists
    const existingNurse = await nurseRepo.findOne({where: {email: nurse.email}})
    if (existingNurse !== null) {
        throw new Error('User already exists')
    }

    const createdNurse = nurseRepo.create(nurse)
    nurseRepo.save(createdNurse)

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await userRepo.create({
        password: hashedPassword,
        nurse
    })
    await userRepo.save(createdUser)
}

export async function login(email: string, password: string) {
    const userRepo = AppDataSource.getRepository(User)
    const nurseRepo = AppDataSource.getRepository(Nurse)

    // Find user by email (include password field)
    const nurse = await nurseRepo.findOne({
        where: {email},
        select: ['id', 'email']
    })

    if (!nurse) {
        throw new Error('Invalid email or password')
    }

    const user = await userRepo.findOne({
        where: {nurseId: nurse.id},
        select: ['nurseId', 'password', 'active']
    })

    if (!user) {
        throw new Error('Invalid email or password')
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid email or password')
    }

    console.log(JWT_EXPIRE)

    // Generate JWT token
    const token = jwt.sign(
        {nurseId: user.nurseId, email: nurse.email},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRE}
    )

    return {token}
}

export async function logout(token: string): Promise<void> {
    // Parse JWT expiry time to know how long to keep it in blacklist
    const decoded = jwt.decode(token) as any
    const expiresIn = decoded?.exp ? decoded.exp - Math.floor(Date.now() / 1000) : JWT_EXPIRE // Default 24h

    // Add token to blacklist (now async)
    await blacklistService.addToBlacklist(token, expiresIn)
}

