const { Router } = require('express')
const { body } = require('express-validator')

const validator = require('../middlewares/validator')
const { authPost } = require('../controllers/auth')

const router = Router()

router.post('/login',[
    body('username').not().isEmpty().withMessage('The username is required'),
    body('password').not().isEmpty().withMessage('The password is required.'),
    validator
], authPost)

module.exports = router