const router = require('express').Router()
const controllers = require('../../controllers/user.controller')
const auth = require('../auth')
const validator = require('../../validators')

const csrf = require('csurf')

var csrfProtection = csrf({ cookie: true })


router.get('/', auth.required, controllers.onGetAll)
router.get('/me', auth.required, controllers.me)
router.get('/logout', controllers.logout)
router.get('/csrf-token',csrfProtection, controllers.getCsrf)
router.get('/:id', auth.required, controllers.onGetById)
router.post('/', auth.required,csrfProtection, controllers.onInsert)
router.put('/:id', auth.required, csrfProtection, controllers.onUpdate)
router.delete('/:id', auth.required, controllers.onDelete)
router.post('/login',csrfProtection, controllers.onLogin)
router.post('/register',csrfProtection, controllers.onRegister)
router.post('/refresh-token', controllers.onRefreshToken)


module.exports = router
