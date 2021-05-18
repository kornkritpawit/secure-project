const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  cors = require('cors')
;(passport = require('passport')), (path = require('path'))

const cookieParser = require('cookie-parser')

module.exports = async (app) => {
  // Connect MongoDB
  require('../configs/databases')

  // CORS
  const allowedOrigins = ['http://localhost:3000']
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true
  }
  app.use(cors(corsOptions))

  // Parser Body
  app.use(express.json())
  app.use(cookieParser())
  // app.use(express.urlencoded({ extended: false }))

  // Logger
  app.use(morgan('dev'))

  // Passport
  require('../configs/passport')

  // Static file
  app.use('/static', express.static(path.join(__dirname, '../public')))

  // Custom Response Format
  app.use(require('../configs/responseFormat'))
}
