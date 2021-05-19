const router = require('express').Router()
const controllers = require('../../controllers/product.controller')

const csrf = require('csurf')

var csrfProtection = csrf({ cookie: true })


router.get('/', controllers.onGetAll)
router.get('/:id', controllers.onGetById)
router.post('/',csrfProtection, controllers.onInsert)
router.post('/buy/:id',csrfProtection, controllers.onBuyProduct)
router.put('/:id',csrfProtection, controllers.onUpdate)
router.delete('/:id', controllers.onDelete)


module.exports = router
