import express from 'express'
import { login } from '../controller/authController.js'
import { adminLoginSchema } from '../validation/authValidation.js'
import { validate } from '../middleware/middlewareValidate.js'

const router = express.Router()

router.post('/login', validate(adminLoginSchema),login)

export default router;