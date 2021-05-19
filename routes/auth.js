const jwt = require('express-jwt'),
      secret = require('../configs/app').secret

const getTokenFromHeader = (req) => {
  console.log(req.cookies.user)
  // if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
  //   req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //   return req.headers.authorization.split(' ')[1];
  // }
  // return null;

  if (req.cookies.accessToken) {
    return req.cookies.accessToken
  } return null
}

const auth = {
  required: jwt({
    secret: secret,
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
