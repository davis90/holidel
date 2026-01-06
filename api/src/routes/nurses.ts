import {Response, Router} from 'express'
import {getNurses, getNurseById} from '../controllers/nurseController'
import {optionalAuthMiddleware} from '../middlewares/authMiddleware'
import {AuthRequest} from '../interfaces/request'

const router = Router()

router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10
        return await getNurses(req.isAuthenticated || false, page, limit)
    } catch (err: any) {
        console.error(err)
        res.status(500).json({error: 'Internal server error'})
    }
})

export default router

