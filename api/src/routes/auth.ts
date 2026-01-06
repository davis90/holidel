import {Response, Router} from 'express'
import {register, login, logout} from '../controllers/userController'
import {AuthRequest} from '../interfaces/request'
import {Nurse} from '../entities/Nurse'

const router = Router()

router.post('/register', async (req: AuthRequest, res: Response) => {
    try {
        const {nurse, password}: {nurse: Nurse, password: string} = req.body

        if (!nurse || !password) {
            return res.status(400).json({error: 'Bad informations'})
        }
        await register(nurse, password)
        res.status(201).json({message: 'User registered successfully'})
    } catch (err: any) {
        console.error(err)
        res.status(400).json({error: err.message})
    }
})

router.post('/login', async (req: AuthRequest, res: Response) => {
    try {
        const {email, password} = req.body

        console.log(req.body)

        if (!email || !password) {
            return res.status(400).json({error: 'Email and password are required'})
        }

        const result = await login(email, password)
        res.json(result)
    } catch (err: any) {
        console.error(err)
        res.status(401).json({error: err.message})
    }
})

router.post('/logout', async (req: AuthRequest, res: Response) => {
    try {
        if (!req.token) {
            return res.status(400).json({error: 'No token provided'})
        }
        await logout(req.token)
        res.json({message: 'Logged out successfully'})
    } catch (err: any) {
        console.error(err)
        res.status(500).json({error: err.message})
    }
})

export default router
