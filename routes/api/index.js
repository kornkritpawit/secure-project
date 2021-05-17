const router = require('express').Router()
const auth = require('../auth')

router.use('/users', require('./user'))
router.use('/products', auth.required, require('./product'))

module.exports = router