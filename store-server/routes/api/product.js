const router = require('express').Router()
const controllers = require('../../controllers/product.controller')

router.get('/', controllers.onGetAll)
router.get('/:id', controllers.onGetById)
router.post('/', controllers.onInsert)
router.post('/buy/:id', controllers.onBuyProduct)
router.put('/:id', controllers.onUpdate)
router.delete('/:id', controllers.onDelete)

module.exports = router