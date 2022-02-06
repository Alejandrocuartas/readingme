const { Router } = require('express')
const { body, param } = require('express-validator')

const validator = require('../middlewares/validator')

const { postUser, deleteUser, postUserGetter } = require('../controllers/users')
const { existUsername, existUser } = require('../middlewares/dbValidators')
const sessionHandler = require('../middlewares/sessionHandler')

const router = Router()

router.get('/:id', postUserGetter)

router.delete('/delete/:id',[
    sessionHandler,
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