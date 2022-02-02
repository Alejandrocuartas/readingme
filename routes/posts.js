const { Router } = require('express')

const { postsGet, postsDelete, postsPost } = require('../controllers/posts')

const router = Router()

router.get('/', postsGet)

router.post('/', postsPost)

router.delete('/', postsDelete)

module.exports = router