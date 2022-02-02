const { Router } = require('express')
const { body, param } = require('express-validator')

const validator = require('../middlewares/validator')

const { postUser, deleteUser } = require('../controllers/users')
const { existUsername, existUser } = require('../middlewares/dbValidators')

const router = Router()


router.delete('/delete/:id',[
    param('id')
            .isMongoId().withMessage('Incorrect id')
            .custom( existUser ),
    validator
], deleteUser)


router.post('/create',[
    body('username')
            .not().isEmpty().withMessage('The username cannot be empty.')
            .isLength({ min: 6 }).withMessage('The username must have at least 6 characters.')
            .custom( existUsername ),
    body('password')
            .not().isEmpty().withMessage('password cannot be empty'),
    validator
], postUser)

module.exports = router