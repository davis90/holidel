import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import nursesRouter from './routes/nurses'
import offersRouter from './routes/offers'
import authRouter from './routes/auth'
import {authMiddleware, optionalAuthMiddleware} from './middlewares/authMiddleware'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => res.json({ok: true, name: 'holidel-api'}))

// Public routes (no auth required)
app.use('/auth', optionalAuthMiddleware, authRouter)

// Semi-public routes (optional auth)
app.use('/offers', optionalAuthMiddleware, offersRouter)

// Protected routes (require JWT token)
app.use('/nurses', authMiddleware, nursesRouter)

export default app
