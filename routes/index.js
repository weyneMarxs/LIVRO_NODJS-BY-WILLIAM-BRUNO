const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('config')

router.get('/', (reques, response) => {
  response.json({ nome: 'weyne marques', email: 'weyneace@gmail.com' })
})
router.post('/login', (request, response, next) => {
  let username = request.body.username
  let password = request.body.password

  if (username === 'rebels' && password === '1138') {
    let expires = moment().add(7, 'days').valueOf()
    let token = jwt.encode(
      {
        user: username,
        exp: expires
      },
      config.get('jwtTokenSecret')
    )
    response.json({
      token: token
    })
  } else {
    let err = new Error('Unauthorized')
    err.status = 401
    next(err)
  }
})
// STORMTROPPERS
router.use('/stormtroppers', require('./stormtroppers'))

module.exports = router
