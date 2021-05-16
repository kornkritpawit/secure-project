const express = require('express'),
      app = express(),
      config = require('./configs/app')

// Express Configs
require('./configs/express')(app)

// Middleware
require('./configs/middleware')

// Routes
app.use(require('./routes'))

// Error handler
require('./configs/errorHandler')(config.isProduction, app)

// Start Server
const server = app.listen( config.port, () => {
  let port = server.address().port
  console.log(`Server is running at http://localhost:${port}`)
})