const { Router } = require('express')

const validator = require('../middlewares/validator')
const sessionHandler = require('../middlewares/sessionHandler')
const { postFile, deleteFile } = require('../controllers/uploads')

const router = Router()


router.post('/create',[
    validator
], postFile)

router.delete('/:id',[
    validator
], deleteFile)

module.exports = router