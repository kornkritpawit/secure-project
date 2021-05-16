const Product = require('../models/Product'),
  User = require('../models/User'),
  config = require('../configs/app'),
  { ErrorBadRequest, ErrorNotFound, ErrorForbidden } = require('../configs/errorMethods')

const methods = {
  scopeSearch(req) {
    $or = []
    if (req.query.title) $or.push({ title: { $regex: req.query.title } })
    if (req.query.description) $or.push({ description: { $regex: req.query.description } })
    const query = $or.length > 0 ? { $or } : {}
    const sort = { createdAt: -1 }
    if (req.query.orderByField && req.query.orderBy)
      sort[req.query.orderByField] = req.query.orderBy.toLowerCase() == 'desc' ? -1 : 1
    return { query: query, sort: sort }
  },

  find(req) {
    const limit = +(req.query.size || config.pageLimit)
    const offset = +(limit * ((req.query.page || 1) - 1))
    const _q = methods.scopeSearch(req)

    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          Product.find(_q.query).sort(_q.sort).limit(limit).skip(offset).populate('author'),
          Product.countDocuments(_q.query),
        ])
          .then((result) => {
            const rows = result[0],
              count = result[1]
            resolve({
              total: count,
              lastPage: Math.ceil(count / limit),
              currPage: +req.query.page || 1,
              rows: rows,
            })
          })
          .catch((error) => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  },

  

  buyProduct(id, user, bill) {
    return new Promise(async (resolve, reject) => {
      // console.log(id)
      console.log(user)
      try {
        obj = await Product.findById(id)
        user = await User.findById(user.id)
        console.log(user)
        obj.available = obj.available - bill.number
        user.cash -= bill.number * obj.price
        if (!obj) reject(ErrorNotFound('id: not found'))
        await Product.updateOne({_id: id}, obj)
        await User.updateOne({_id: user.id}, user)
        console.log(user, obj)
        resolve("Buy Successfully")
      } catch (error) {
        reject(ErrorNotFound('id: not found'))
      }
    })
  },

  findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Product.findById(id)
        if (!obj) reject(ErrorNotFound('id: not found'))
        resolve(obj.toJSON())
      } catch (error) {
        reject(ErrorNotFound('id: not found'))
      }
    })
  },

  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = new Product(data)
        const inserted = await obj.save()
        resolve(inserted)
      } catch (error) {
        reject(ErrorBadRequest(error.message))
      }
    })
  },

  update(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Product.findById(id)
        if (!obj) reject(ErrorNotFound('id: not found'))
        await Product.updateOne({ _id: id }, data)
        resolve(Object.assign(obj, data))
      } catch (error) {
        reject(error)
      }
    })
  },

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Product.findById(id)
        if (!obj) reject(ErrorNotFound('id: not found'))
        await Product.deleteOne({ _id: id })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
}

module.exports = { ...methods }
