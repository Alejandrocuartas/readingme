const { Router } = require('express')
const { body, param } = require('express-validator')

const { postsGet, postsDelete, postsPost } = require('../controllers/posts')
const validator = require('../middlewares/validator')
const { usernameGetter, existPost } = require('../middlewares/dbValidators')
const sessionHandler = require('../middlewares/sessionHandler')
const fileExtensionValidator = require('../middlewares/fileValidator')

const router = Router()

router.get('/', postsGet)

router.post('/create',[
    fileExtensionValidator,
    usernameGetter,
    body('postcomment')
            .not().isEmpty().withMessage('The post must have one message.')
            .isLength({ min: 5 }).withMessage('The post message must have at least 5 characters.'),
    validator
], postsPost)

router.delete('/:id',[
    sessionHandler('postsDelete'),
    param('id')
            .isMongoId().withMessage('incorrect id')
            .custom( existPost ),
    validator
], postsDelete)

module.exports = router