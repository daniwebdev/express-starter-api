import { Router } from 'express'
import { authRouter } from './auth.route';

var router = Router();


router.use('/auth', authRouter)

export const appRouter = router;